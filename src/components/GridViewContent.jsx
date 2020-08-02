import React, { Component } from 'react';

import '../style/GridViewContent.css';

export default class GridViewContent extends Component {
    constructor(props) {
        super(props);

        this.state = { ...props };
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

    render() {
        const { headers, data, itemSelectAction, page, limit, sortingMode, sortingKey } = this.state;

        let sortedData = data;
        if (sortingMode !== -1) {
            if (sortingMode === 0)
                sortedData.sort((a, b) => a[sortingKey] - b[sortingKey]);
            else if (sortingMode === 1)
                sortedData.sort((a, b) => b[sortingKey] - a[sortingKey]);
        }

        let rows = [];
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

        return (
            <div className={'content'}>
                {rows.length === 0 ? 'нет данных' : rows}
            </div>
        );
    }
}