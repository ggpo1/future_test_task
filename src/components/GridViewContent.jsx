import React, { Component } from 'react';

import '../style/GridViewContent.css';

export default class GridViewContent extends Component {
    constructor(props) {
        super(props);

        this.state = { ...props };
    }

    render() {
        const { headers, data } = this.state; 

        let rows = [];
        data.forEach((dataRow, i) => {
            
            rows.push(<div key={`row_${i}`} className={'row'}>{JSON.stringify(dataRow)}</div>);
        });

        return (
            <div className={'content'}>
                {rows}
            </div>
        );   
    }
}