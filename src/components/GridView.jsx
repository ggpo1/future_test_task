import React from 'react';
import '../style/GridView.css'
import GridViewHeader from './GridViewHeader';
import GridViewContent from './GridViewContent';

export default class GridView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props  }
    }

    static getDerivedStateFromProps(props, state) {
        return { ...props };
    }

    render() { 
        const { dataSource, width, height } = this.state;
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
                <GridViewHeader headers={keys} />
                <GridViewContent headers={keys} data={dataSource} />
            </div>
        );
    }
}

