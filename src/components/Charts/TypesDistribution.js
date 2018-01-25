import React, { Component } from 'react';
import { Chart } from '@progress/kendo-charts-react-wrapper';

class TypesDistribution extends Component {
    constructor(props) {
        super(props);
        this.addSeries = this.addSeries.bind(this);

        this.state = {
            initialGrey: '#A2ACAC',
            visibleSeries: [],
            seriesColors: [
                { label: "SEV: Low", value: "#FF9966", active: false },
                { label: "SEV: Medium", value: "#BB6ACB", active: false },
                { label: "SEV: High", value: "#52C3D3", active: false },
                { label: "Enhancement", value: "#22C85D", active: false },
                { label: "Feature", value: "#FF6358", active: false },
                { label: "Others", value: "#2BA7DA", active: false }
            ]
        };

        this.addSeries({ label: "SEV: Low", value: '#FF9966', active: false }, true);
        this.addSeries({ label: 'Enhancement', value: '#22C85D', active: false }, true);
        this.addSeries({ label: 'Others', value: '#2BA7DA', active: false }, true);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
        return true;
    }

    toggleSeriesColors() {
        let newSeries = this.state.seriesColors.slice(0).map(series => series.active = !series.active);

        this.setState({
            seriesColors: newSeries
        });
    }

    addSeries(button, toggle)
    {
        if (toggle) {
            this.toggleSeriesColors();
        }

        if (this.state.seriesColors.find(color => color.label === button.label) === undefined) {
debugger;
        }

        const newSeries = {
            color: this.state.seriesColors.find(color => color.label === button.label).value,
            markers: { visible: false },
            data: this.props.data[button.label]
        };

        if (this.state.visibleSeries.some(series => series.color === newSeries.color))
        {
            const removeIndex = this.state.visibleSeries.map(item => item.color).indexOf(newSeries.color);
            if (removeIndex) {
                this.setState(prevState => {
                    return {
                        visibleSeries: this.state.visibleSeries.slice(0, removeIndex).concat(this.state.visibleSeries.slice(removeIndex + 1))
                    }
                });
            }
        } else {
            this.setState(prevState => {
                let newSeries = [...prevState.visibleSeries, newSeries];
                return {
                    visibleSeries: newSeries,
                    series: ([].concat(newSeries))
                };
            });
        }
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
                <div className="row card-block small">
                    {
                        this.state.seriesColors.forEach(button => {
                            <a
                                onClick={this.addSeries(button, true)}
                                style={{color: button.active ? button.value : this.state.initialGrey}}
                                className="col-xs-4 col-sm-3 col-md comp-label">
                                <strong>{this.props.data[button.label].length}</strong>
                                <small>{button.label}</small>
                            </a>
                        })

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
