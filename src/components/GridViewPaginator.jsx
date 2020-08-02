import React, { Component } from 'react';

import '../style/GridViewPaginator.css';

export default class GridViewPaginator extends Component {
    constructor(props) {
        super(props);

        this.state = { ...props };
    }

    static getDerivedStateFromProps(props, state) {
        return { ...props };
    }

    render() {
        const { page, switchAction } = this.state;
        return (
            <div className={'grid-view-paginator-container'}>
                <div className={'paginator-controls'}>
                    <div onClick={() => switchAction(page - 1)}>назад</div>
                    <div>{page + 1}</div>
                    <div onClick={() => switchAction(page + 1)}>вперед</div>
                </div>
            </div>
        );
    }
}