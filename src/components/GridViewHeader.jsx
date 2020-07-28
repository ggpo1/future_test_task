import React, { Component } from 'react';

import '../style/GridViewHeader.css';

export default class GridViewHeader extends Component {
    constructor(props) {
        super(props);

        this.state = { ...props }; 
    }

    render() {
        const { headers } = this.state;
        console.log(headers);

        let headersEls = [];
        headers.forEach((header, i) => {
            headersEls.push(
                <div key={`header_cell_${i}`} className={'header-cell'}>
                    {header.key}
                </div>
            );
        })

        return (
            <div className={'header'}>
                {headersEls}
            </div>
        );
    }
}