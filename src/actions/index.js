export const periodChanged = (period) => {
    return {
        type: 'PERIOD_CHANGED',
        payload: period
    }
};

export const issuesReceived = (issues) => {
    return {
        type: 'ISSUES_RECEIVED',
        payload: issues
    }
}

export const issuesToggleExpand = (issues) => {
    return {
        type: 'TOGGLE_EXPAND',
        payload: issues
    }
}

export const issuesDetails = (issues) => {
    return {
        type: 'ISSUES_DETAILS',
        payload: issues
    }
}

export const issuesFetched = () => {
    return {
        type: 'ISSUES_FETCHED'
    }
}
