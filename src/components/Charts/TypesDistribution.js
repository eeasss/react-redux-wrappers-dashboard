import React, { Component } from 'react';
import { Chart } from '@progress/kendo-charts-react-wrapper';

class TypesDistribution extends Component {
    constructor(props) {
        super(props);
        this.addSeries = this.addSeries.bind(this);
        let seriesColors = [
            { label: "SEV: Low", value: "#FF9966", active: true },
            { label: "SEV: Medium", value: "#BB6ACB", active: false },
            { label: "SEV: High", value: "#52C3D3", active: false },
            { label: "Enhancement", value: "#22C85D", active: true },
            { label: "Feature", value: "#FF6358", active: false },
            { label: "Others", value: "#2BA7DA", active: true }
        ];
        let mapSeries = ((series) => {
            return {
                color: series.value,
                markers: { visible: false },
                data: this.props.data[series.label]
            };
        }).bind(this);

        this.state = {
            initialGrey: '#A2ACAC',
            visibleSeries: seriesColors.filter(s => s.active).map(mapSeries),
            seriesColors: seriesColors,
            mapSeries: mapSeries
        };
    }

    addSeries(button)
    {
        let seriesColors = this.state.seriesColors.map(b => { if (button.value === b.value) { b.active = !b.active } return b;});
        let visibleSeries = seriesColors.filter(s => s.active).map(this.state.mapSeries)

        this.setState({seriesColors, visibleSeries});
    }

    render() {
        const seriesDefaults = { type: 'line', overlay: false };
        const categoryAxis = [{baseUnit: 'months', majorTicks: { visible: false }, labels: { step: 4, skip: 2}, majorGridLines: { visible: false }, line: { visible: false} }];
        const series = this.state.visibleSeries.map(series => {
            return {
                data: series.data,
                markers: series.markers,
                color: series.color,
                style: 'smooth',
                aggregate: 'count',
                categoryField: 'date'
            }
        });
        const valueAxis = [{ line: {visible: false}, labels: {step: 2, skip: 2}, majorGridLines: {step: 2, skip: 2, color: '#F0F2F2'} }];

        return (
            <div className="card">
                <h4 className="card-header">Types Distribution</h4>
                <div className="row card-block pb-0 small">
                    {
                        this.state.seriesColors.map(button =>
                            <a
                                onClick={() => { this.addSeries(button) }}
                                key={button.label}
                                style={{color: button.active ? button.value : this.state.initialGrey}}
                                className="col-6 col-lg-4 col-xl-2 pb-3 comp-label">
                                <strong>{this.props.data[button.label].length}</strong>
                                <small>{button.label}</small>
                            </a>
                        )

                    }
                </div>
                <div className="card-block">
                    <Chart style={{height: '300px'}} transitions="false"
                        seriesDefaults={seriesDefaults}
                        categoryAxis={categoryAxis}
                        series={series}
                        valueAxis={valueAxis}>
                    </Chart>
                </div>
            </div>
        );
    }
}

export default TypesDistribution;