import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import App from './App';

import './index.scss';
import '@progress/kendo-ui';

import { issuesStore } from "./store";
import { Provider } from "react-redux";

import registerServiceWorker from './registerServiceWorker';
const AppWithRouting = withRouter(App);

ReactDOM.render((

    <Provider store={issuesStore}>
        <BrowserRouter>
            <AppWithRouting />
        </BrowserRouter>
    </Provider>
    ),
    document.getElementById('root')
);
registerServiceWorker();
