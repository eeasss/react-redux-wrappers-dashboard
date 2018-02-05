import React from 'react';
import { Chart } from '@progress/kendo-charts-react-wrapper';

const ClosedIssues = (props) => {
    const seriesDefaults = { type: 'column', stack: true, gap: 0.5, overlay: false };
    const series = [{ color: '#CC3458',data: props.open, field: 'count', categoryField: 'date', aggregate: 'count'}]
    const categoryAxis = [{ baseUnit: 'months', majorTicks: { visible: false  }, labels: { step: 4, skip: 2, font: '10px sans-serif' }, line: { visible: false } }];
    const valueAxis = [{ visible: false, majorGridLines: { visible: false } }];
    return (
        <div className="col-12 col-lg-6 col-xl pb-4 text-danger closed-issues">
            <span className="comp-label">
                <strong>{ props.open.length }</strong>
                <small>Open issues</small>
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