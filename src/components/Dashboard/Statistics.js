import React, { Component } from 'react';
import ActiveIssues from './../Charts/ActivesIssues';
import IssuesTypes from './../Charts/IssuesTypes';
import TypesDistribution from './../Charts/TypesDistribution';

const Statistics = (props) => {
    const { dispatch } = props;

    return (
        <div className="row">
        <div className="col-md-12">
            <ActiveIssues
                data={props.groupedIssues}
                months={props.months}
                issues={props.issues}
                closeRate={props.closeRate}
                active={props.active}
            />
        </div>
        <div className="col-md-4">
            <IssuesTypes data={props.issuesTypes} />
        </div>
        <div className="col-md-8">
        *ngIf="issues.active.length
            <TypesDistribution data={props.typesDistribution} months="months" />
        </div>
        </div>
    );
}

export default Statistics;
