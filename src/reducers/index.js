import { combineReducers } from 'redux';
import { issuesPeriod } from './issuesPeriod';
import { issues } from './issues';
import { issuesPaging } from './issuesPaging';

export const issuesDashboard = combineReducers({issues, issuesPeriod, issuesPaging});