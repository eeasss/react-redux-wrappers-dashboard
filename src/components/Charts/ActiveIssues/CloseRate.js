import React from 'react';
import { Chart } from '@progress/kendo-charts-react-wrapper';

const CloseRate = (props) => {
    const series = [{ type: 'bullet', taget: {color: '#FFF'},data: props.bulletData, currentField: 'current', targetField: 'target', color: '#CC3458'}]
    const categoryAxis = [{plotBands: [{from: 0, to:100, color: '#35C473'}]}];
    const closeRate = props.closeRate.average;
    const bulletData = [{target: 70, current: Math.round(closeRate * 100)}];
    const formatp = (number) => {
        return Intl.NumberFormat(navigator.language, {style: 'percent'}).format(number);
    };

    const formatd = (date) => {
        if (!date) {
            return '';
        }
        return new Date(parseInt(date)).toDateString();
    }

    return (
        <div className="col-12 col-lg-6 col-xl pb-4 close-rate">
            <span className="comp-label">
                <strong>{formatp(props.closeRate.average)}</strong>
                <small>Close rate</small>
            </span>
            <p className="m-0 small text-uppercase text-muted">
                Highest:
                {formatp(props.closeRate.highest.close_rate) }
                on {formatd(props.closeRate.highest.created_at)}
            </p>
            <p className="m-0 small text-uppercase text-muted">
                Lowest:
                {formatp(props.closeRate.lowest.close_rate)}
                on {formatd(props.closeRate.lowest.created_at)}
            </p>
            <Chart
                chartArea={{margin: -20, height: 20}}
                series={series}
                categoryAxis={categoryAxis}
            >
            </Chart>
        </div>
    );
};

// <kendo-chart style="height: 20px;" [chartArea]="{margin: -20}">
// <kendo-chart-series>
//     <kendo-chart-series-item type="bullet"
//         [data]="bulletData"
//         [target]="{color: '#FFF'}"
//         currentField="current"
//         targetField="target"
//         color="#CC3458"
//     ></kendo-chart-series-item>
// </kendo-chart-series>
// <kendo-chart-value-axis>
//     <kendo-chart-value-axis-item
//         [plotBands]="[{from:0, to:100, color: '#35C473'}]"
//         [visible]="false"
//         [majorGridLines]="{visible: false}">
//     </kendo-chart-value-axis-item>
// </kendo-chart-value-axis>
// </kendo-chart>

export default CloseRate;