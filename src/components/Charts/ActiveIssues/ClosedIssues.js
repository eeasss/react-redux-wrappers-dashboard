import React from 'react';
import { Chart } from '@progress/kendo-charts-react-wrapper';

const ClosedIssues = (props) => {
    const seriesDefaults = { type: 'column', stack: true, gap: 0.5, overlay: false };
    const series = [{ color: '#35C473', data: props.closed, field: 'count', categoryField: 'date', aggregate: 'count'}]
    const categoryAxis = { baseUnit: 'months', majorTicks: { visible: false  }, labels: { step: 4, skip: 2, font: '10px sans-serif' }, line: { visible: false } };
    const valueAxis = { visible: false, majorGridLines: { visible: false } };
    return (
        <div className="col-12 col-lg-6 col-xl pb-4 text-success closed-issues">
            <span className="comp-label">
                <strong>{ props.closed.length }</strong>
                <small>Closed issues</small>
            </span>
            <Chart
                chartArea={{height: 80}}
                seriesDefaults={seriesDefaults}
                series={series}
                categoryAxis={categoryAxis}
                valueAxis={valueAxis}
            >
            </Chart>
        </div>
    );
}

export default ClosedIssues;