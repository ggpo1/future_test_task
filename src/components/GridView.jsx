import React from 'react';
import '../style/GridView.css'
import GridViewHeader from './GridViewHeader';
import GridViewContent from './GridViewContent';
import GridViewPaginator from './GridViewPaginator';

export default class GridView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...{
                page: 0,
                sortingMode: -1,
                sortingKey: null,
                isFiltering: false,
                filteringValue: '',
            }, ...props
        }
    }

    static getDerivedStateFromProps(props, state) {
        return { ...props };
    }

    paginatorSwitchAction = (page) => {
        if (page >= 0)
            this.setState({ page });
    }

    headerSortAction = (key) => {
        if (key === this.state.sortingKey) {
            // sortingMode
            if (this.state.sortingMode === 1)
                this.setState({ sortingKey: key, sortingMode: -1 });
            else
                this.setState({ sortingMode: this.state.sortingMode + 1 });
        } else {
            this.setState({ sortingKey: key, sortingMode: 0 });
        }
    }

    headerFilterInputChange = (value) => this.setState({ filteringValue: value });

    filterAction = () => {
        console.log(this.state.filteringValue);
        if (this.state.filteringValue.length === 0) {
            this.setState({ isFiltering: false });
        } else {
            this.setState({ isFiltering: true });
            this.forceUpdate();
        }
    }

    setAddPage = () => this.setState({ page: this.state.page === -1 ? 0 : -1 });
    addNewRowAction = (addObj) => {
        let reverse = this.state.dataSource.reverse();
        reverse.push(addObj);
        reverse = reverse.reverse();
        this.setState({ page: 0, dataSource: reverse });
    };

    render() {
        const { dataSource, width, height, itemSelectAction, page, limit, sortingMode, sortingKey, filteringValue, isFiltering } = this.state;
        if (dataSource === undefined || dataSource.length === 0) return null;

        let keys = [];
        Object.keys(dataSource[0]).forEach(key => {
            let subKeys = [];
            if (typeof dataSource[0][key] === 'object') subKeys = Object.keys(dataSource[0][key]);
            keys.push({
                key,
                hasSubKeys: (subKeys.length !== 0),
                subKeys: subKeys
            });
        });

        return (
            <div className={'table'} style={{ width: `${width}%`, height: `${height}%` }}>
                <div className={'add-button-block'}>
                    <button onClick={this.setAddPage}>добавить</button>
                </div>
                <GridViewHeader
                    sortingKey={sortingKey}
                    sortingMode={sortingMode}
                    sortAction={this.headerSortAction}
                    filterInputChange={this.headerFilterInputChange}
                    filterAction={this.filterAction}
                    headers={keys}
                />
                <GridViewContent
                    page={page}
                    limit={limit}
                    itemSelectAction={itemSelectAction}
                    headers={keys}
                    data={dataSource}
                    sortingMode={sortingMode}
                    sortingKey={sortingKey}
                    filteringValue={filteringValue}
                    isFiltering={isFiltering}
                    addNewAction={this.addNewRowAction}
                />
                <GridViewPaginator page={page} switchAction={this.paginatorSwitchAction} />
            </div>
        );
    }
}

