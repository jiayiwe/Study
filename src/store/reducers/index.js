import { connectRouter } from "connected-react-router"
import { combineReducers } from "redux"

import login from "./user/login"
import regist from "./user/regist"
import setting from "./user/setting"
import profile from "./profiles"
import article from "./article"
import articles from "./articles"
import comment from "./comment"
import home from "./home"

const createRootReducer = (history) => combineReducers({
    user: combineReducers({
        login,
        regist,
        setting
    }),
    profile,
    article,
    articles,
    comment,
    home,
    router: connectRouter(history)
})

export default createRootReducer