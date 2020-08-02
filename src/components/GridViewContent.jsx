import React, { Component } from 'react';

import '../style/GridViewContent.css';

export default class GridViewContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...{
                addObj: {}
            }, ...props
        };
    }

    static getDerivedStateFromProps(props, state) {
        return { ...props };
    }

    getString = (subHeaders, dataRow) => {
        let str = '';
        // console.log(subHeaders, dataRow);
        subHeaders.forEach(subHeader => str += `${dataRow[subHeader]} `);
        return str;
    };

    addInputsValueChange = (key, value, subKey) => {
        if (subKey !== undefined) {
            if (this.state.addObj[key] === undefined) this.state.addObj[key] = {};
            
            this.state.addObj[key][subKey] = value;
        } else {
            this.state.addObj[key] = value;
        }
        
        this.setState(this.state.addObj);
    }

    isAddDisabled = () => {
        const { headers, addObj } = this.state;
        return !(Object.keys(headers).length === Object.keys(addObj).length);
    }

    render() {
        const {
            headers,
            data,
            itemSelectAction,
            page,
            limit,
            sortingMode,
            sortingKey,
            isFiltering,
            filteringValue,
            addNewAction
        } = this.state;

        let sortedData = data;
        let rows = [];

        if (page === -1) {
            headers.forEach((header) => {
                if (header.hasSubKeys) {
                    header.subKeys.forEach(sub => rows.push(
                        <input key={`add_input_${sub}`} onChange={(e) => this.addInputsValueChange(header.key, e.target.value, sub)} type="text" placeholder={sub} />
                    ));
                } else {
                    rows.push(
                        <input key={`add_input_${header.key}`} onChange={(e) => this.addInputsValueChange(header.key, e.target.value)} type="text" placeholder={header.key} />
                    );
                }
            })

            rows.push(<input key={'add_button'} disabled={this.isAddDisabled()} type="button" onClick={() => addNewAction(this.state.addObj)} value={'Добавить в таблицу'} />);
        } else {
            if (isFiltering) {
                console.log('filtering');
                sortedData = sortedData.filter(el => {
                    let isLike = false;
                    headers.forEach(header => {
                        if (el[header.key].toString().toLowerCase().includes(filteringValue.toLowerCase())) isLike = true;
                    });
                    return isLike;
                });
            }

            if (sortingMode !== -1) {
                if (sortingMode === 0)
                    sortedData.sort((a, b) => a[sortingKey] - b[sortingKey]);
                else if (sortingMode === 1)
                    sortedData.sort((a, b) => b[sortingKey] - a[sortingKey]);
            }


            for (let j = page * limit; j < page * limit + limit; j++) {
                let dataRow = sortedData[j];
                let cells = [];
                if (dataRow !== undefined) {
                    headers.forEach((header, i) => {
                        if (!header.hasSubKeys) {
                            cells.push(
                                <div title={dataRow[header.key]} key={`header_cell_${i}`} className={'content-cell'}>
                                    {(dataRow[header.key] + '').length > 25 ? '...' : dataRow[header.key]}
                                </div>
                            );
                        } else {
                            cells.push(
                                <div key={`header_cell_${i}`} className={'content-cell'}>
                                    {this.getString(header.subKeys, dataRow[header.key])}
                                </div>
                            );
                        }
                    });
                }
                if (cells.length !== 0) {
                    rows.push(<div key={`row_${j}`} onClick={() => itemSelectAction(dataRow)} className={'row'}>{cells}</div>);
                }
            };
        }

        return (
            <div className={'content'}>
                {rows.length === 0 ? 'нет данных' : rows}
            </div>
        );
    }
}