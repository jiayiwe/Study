import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { createBrowserHistory } from "history"
import { routerMiddleware } from "connected-react-router"

import createRootReducer from "./reducers"

export const history = createBrowserHistory()

export const store = createStore(
    createRootReducer(history),
    applyMiddleware(routerMiddleware(history), thunk)
)