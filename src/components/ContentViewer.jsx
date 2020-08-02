import React, { Component } from 'react';
import '../style/ContentViewer.css';

export default class ContentViewer extends Component {
    constructor(props) {
        super(props);

        this.state = { ...props };
    }

    static getDerivedStateFromProps(props, state) {
        return { ...props };
    }

    render() {
        const { selected, typer } = this.state;
        if (selected === undefined || JSON.stringify(selected) === '{}') return null;

        // TO ADDIT FILE
        let keys = [];
        Object.keys(selected).forEach(key => {
            let subKeys = [];
            if (typeof selected[key] === 'object') subKeys = Object.keys(selected[key]);
            keys.push({
                key,
                hasSubKeys: (subKeys.length !== 0),
                subKeys: subKeys
            });
        });

        let blocks = typer(selected);

        return (
            <div className={'content-viewer-container'}>
                {blocks}
            </div>
        );
    }
}