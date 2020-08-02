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
                sortingKey: null
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

    render() {
        const { dataSource, width, height, itemSelectAction, page, limit, sortingMode, sortingKey } = this.state;
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
                <GridViewHeader
                    sortingKey={sortingKey}
                    sortingMode={sortingMode}
                    sortAction={this.headerSortAction}
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
                />
                <GridViewPaginator page={page} switchAction={this.paginatorSwitchAction} />
            </div>
        );
    }
}

