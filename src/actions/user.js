import { push } from "connected-react-router"
import * as constant from "../constant"
import request from "../request"

// 注册  同步
export const registFoiledUpdate = (key, value) => {
    return {
        type: constant.USER_REGIST_FIELD,
        key,
        value
    }
}

// 注册 提交
export const registSubmit = (user) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.regist(user)
            if (result.status === 1) {
                dispatch(push("/login"))
            } else {
                dispatch({ type: constant.USER_REGIST_RESULT, result })
            }
        } catch (error) {
            dispatch({
                type: constant.USER_REGIST_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

// 注册 清空
export const registUnload = () => {
    return { type: constant.USER_REGIST_UNLOAD }
}

// 登录 提交
export const loginSubmit = (email, password) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.login(email, password)

            dispatch({ type: constant.USER_LOGIN_RESULT, result })

        } catch (error) {
            dispatch({
                type: constant.USER_LOGIN_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

// 登录 清空
export const loginUnload = () => {
    return { type: constant.USER_LOGIN_UNLOAD }
}

// 登录 同步
export const loginFoiledUpdate = (key, value) => {
    return {
        type: constant.USER_LOGIN_FIELD,
        key,
        value
    }
}