import React, { Component } from 'react';
import Statistics from './Statistics';
import { mapIssue, groupLabels, distribution } from './../../lib/issues';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    let mappedIssues = state.issues.map(mapIssue);
    return {
        groupedIssues:  state.groupedIssues,
        months: state.issuesPeriod,
        issues: mappedIssues,
        issuesTypes: groupLabels(mappedIssues),
        typesDistribution: distribution(mappedIssues),
        closeRate: 5,
        active: mappedIssues
    };
}

// data={this.props.issues.groupedIssues}
// months={this.props.months}
// issues={this.props.issues}
// closeRate={this.props.issues.closeRate.average}
// active={this.props.issues.active}

const ChartsContainer = connect(mapStateToProps)(Statistics);
export default ChartsContainer;