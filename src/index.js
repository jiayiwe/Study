import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, Switch } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"
import { Provider } from "react-redux"
import { store, history } from "./store"


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path={"/"} component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>

    ,
    document.getElementById('root'));
