import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from 'axios';
import { history } from './history';
import './styles/style.scss';
import "./index.css";
import configureStore from "./store";
import makeAuthManager from './managers/auth';
import makeHeadersManager from './managers/headers';
import * as serviceWorker from "./serviceWorker";
import makeApi from './api';
import Root from "./containers/Root";

const configure = async () => {
    const authManager = makeAuthManager({ storage: localStorage });
    const headersManager = makeHeadersManager({ authManager });

    const api = makeApi({ headersManager, client: axios });
    const store = configureStore({ api, history, authManager });

    const JWTcreds = authManager.getCredentials();

    if (JWTcreds) {
        localStorage.setItem('token', JWTcreds);
        history.push('/dash');
    }

    const rootElement = document.getElementById("root");

    ReactDOM.render(
        <Provider store={store}>
            <Root history={history} />
        </Provider>,
        rootElement
    );

    serviceWorker.unregister();
};

configure();
