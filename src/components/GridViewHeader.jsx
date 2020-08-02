import React, { Component } from 'react';

import '../style/GridViewHeader.css';

export default class GridViewHeader extends Component {
    constructor(props) {
        super(props);

        this.state = { ...props };
    }

    static getDerivedStateFromProps(props, state) {
        return { ...props };
    }

    render() {
        const { headers, sortAction, sortingKey, sortingMode } = this.state;
        // console.log(headers);

        let headersEls = [];

        let color = '';
        // if (sortingMode)
        if (sortingMode === 0) color = 'yellow';
        else if (sortingMode === 1) color = 'green';

        headers.forEach((header, i) => {
            headersEls.push(
                <div
                    onClick={() => sortAction(header.key)}
                    key={`header_cell_${i}`}
                    className={'header-cell'}
                    style={{ color: header.key === sortingKey && color }}
                >
                    {header.key}
                </div>
            );
        })

        return (
            <div className={'header'}>
                <div className={'headers'}>
                    {headersEls}
                </div>
                <div className={'header-search-controls'}>
                    <input type="text" />
                    <button>Найти</button>
                </div>
                

            </div>
        );
    }
}