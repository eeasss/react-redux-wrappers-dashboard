import React, { Component } from 'react';
import Statistics from './Statistics';
import { mapIssue, groupLabels, distribution, groupIssues, closeRate } from './../../lib/issues';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    const mappedIssues = state.issues.map(mapIssue);
    const { open, closed } = groupIssues(mappedIssues);

    return {
        open: open,
        closed: closed,
        months: state.issuesPeriod,
        issuesTypes: groupLabels(mappedIssues),
        typesDistribution: distribution(mappedIssues),
        active: mappedIssues,
        closeRate: closeRate({open: open, closed: closed})
    };
}

// data={this.props.issues.groupedIssues}
// months={this.props.months}
// issues={this.props.issues}
// closeRate={this.props.issues.closeRate.average}
// active={this.props.issues.active}

const ChartsContainer = connect(mapStateToProps)(Statistics);
export default ChartsContainer;