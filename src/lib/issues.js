export const issuesInRange = (issue, from) => {
    return (new Date(issue.created_at).getTime() > from.getTime());
}

const colors = {
    'SEV: LOW': '#ff9800',
    'SEV: MEDIUM': '#ff5d2a',
    'SEV: HIGH': '#d50000',
    'ENHANCEMENT': '#00c853',
    'FEATURE': '#2e7d32',
    'OTHER': '#1ca8dd',
    'PASSED QA': '#57b45b',
    'BUG': '#cf3257',
    'NEEDS QA': '#bc007c',
    'DOCUMENTATION': '#455a64',
    'DEMO': '#673ab7',
    'DELETED': '#f44336',
    'IN PROGRESS': '#ffd600'
  };


const mapUser = (user) => {
    return {
        id: user.id,
        name: user.login,
        avatarUrl: user.avatar_url,
        avatarUrlThumb: user.avatar_url + "&size=60"
    };
}

const mapLabels = (label) => {
    const name = label.name.toUpperCase();

    if (name in colors) {
        label.color = colors[name];
    } else {
        label.color = colors["OTHER"];
    }

    return label;
}

export const mapIssue = (issue) => {
    return {
      id: issue.number,
      title: issue.title,
      body: issue.body,
      author: mapUser(issue.user),
      assignees: (issue.assignees ? issue.assignees.map(mapUser) : []),
      state: issue.state,
      date: new Date(issue.created_at),
      dateClosed: (issue.closed_at ? new Date(issue.closed_at) : undefined),
      count: 1,
      labels: issue.labels.map(mapLabels),
      milestone: issue.milestone,
      created_at: issue.created_at,
      assignee: issue.assignee ? issue.assignee.login : 'none'
    };
}

const flatten = (data) => {
    return data.reduce((acc, curr) => acc.concat(curr), []);
}

const aggregate = (data, field) => {
    return data.reduce((acc, curr) => {
      acc[curr[field]] = (acc[curr[field]] || 0) + 1;
      return acc;
    }, {});
  }

export const groupLabels = (data) => {
    const labels = aggregate(flatten(data.map(item => item.labels)), 'name');
    const low = (labels['SEV: Low'] / data.length);
    const medium = labels['SEV: Medium'] / data.length;
    const high = labels['SEV: High'] / data.length;
    const enhancement = labels['Enhancement'] / data.length;
    const feature = labels['Feature'] / data.length;
    const other = 1 - low - medium - high - enhancement - feature;

    return [
      { type: 'SEV: LOW', value: parseFloat(low.toFixed(2)) },
      { type: 'SEV: MEDIUM', value: parseFloat(medium.toFixed(2)) },
      { type: 'SEV: HIGH', value: parseFloat(high.toFixed(2)) },
      { type: 'ENHANCEMENT', value: parseFloat(enhancement.toFixed(2)) },
      { type: 'FEATURE', value: parseFloat(feature.toFixed(2)) },
      { type: 'OTHER', value: parseFloat(other.toFixed(2)) }
    ];
}

export const distribution = (data) => {
    return data.map(item => ({
      created_at: new Date(item.created_at).setHours(0, 0, 0, 0),
      label: cleanupLabels(item.labels)
    }))
      .reduce((agg, curr) => {
        agg[curr.label].push({
          date: new Date(curr.created_at),
          value: 1
        });
        return agg;
      }, { Others: [], Enhancement: [], 'SEV: Low': [], 'SEV: Medium': [], 'SEV: High': [], 'Feature': [] });
}

const cleanupLabels = (labels) => {
    let filtered = labels.filter(label =>
      label.name === 'SEV: Low' ||
      label.name === 'SEV: High' ||
      label.name === 'Feature' ||
      label.name === 'Enhancement' ||
      label.name === 'SEV: Medium')
      .map(label => label.name);
    return filtered.length === 0 ? 'Others' : filtered[0];
}