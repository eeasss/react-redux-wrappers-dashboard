import React from 'react';
import ActiveIssues from './ActiveIssues';
import ClosedIssues from './ClosedIssues';
import OpenIssues from './OpenIssues';
import AllIssues from './AllIssues';
import CloseRate from './CloseRate';

const ActiveIssuesDash = (props) => {
    const { open, closed, active } = props;
    const activeCount = open.length + closed.length;

    return (
        <div className="card">
            <h3 className="card-header">Active Issues</h3>
            <div className="card-block">
                <div className="row">
                    <ActiveIssues active={active} count={activeCount} />
                    <ClosedIssues closed={closed} />
                    <OpenIssues open={open} />
                    <CloseRate closeRate={props.closeRate} />
                    <AllIssues open={open} closed={closed} />
                </div>
                <div className="row">
                </div>
            </div>
        </div>
    );
}

export default ActiveIssuesDash;