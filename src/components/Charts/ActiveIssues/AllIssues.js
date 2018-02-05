import React from 'react';
import { Chart } from '@progress/kendo-charts-react-wrapper';

const AllIssues = (props) => {
    const seriesDefault = { type: 'column', stack: true, gap: 0.06, overlay: false };
    const series = [
        { opacity: 0.3, border: {color: '#35C473', opacicty: 0.3 }, color: '#35C473', data: props.open, field: 'count', categoryField: 'date', aggregate: 'count'},
        { opacity: 0.3, border: {color: '#CC3458', opacicty: 0.3 }, color: '#CC3458', data: props.closed, field: 'count', categoryField: 'date', aggregate: 'count'}
    ];
    const categoryAxis = [{
        baseUnit: 'months',
        majorTicks: { visible: false  },
        majorGridLines: { visible: false },
        labels: { rotation: 'auto', margin: { top: 8 } },
        line: { visible: false }
    }];
    const valueAxis = [{
        line: {visible: false},
        labels: { step: 2, skip: 2, margin: { right: 4 }},
        majorGridLines: { step: 2, skip: 2, color: '#F0F2F2'}
    }];

    return (
        <div className="col-sm-12">
            <h3>All issues</h3>
            <Chart
                seriesDefaults={seriesDefault}
                series={series}
                categoryAxis={categoryAxis}
                valueAxis={valueAxis}
                >
            </Chart>
        </div>
    );
}

export default AllIssues;