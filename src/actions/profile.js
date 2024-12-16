import * as constant from "../constant"
import request from "../request"

export const getProfile = (username) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.get(username)

            dispatch({ type: constant.PROFILE_GET_RESULT, result })
        } catch (error) {
            dispatch({
                type: constant.PROFILE_GET_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

export const addFollow = (username) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.follow(username)
            dispatch({ type: constant.PROFILE_FOLLOW_RESULT, result })
        } catch (error) {
            dispatch({
                type: constant.PROFILE_FOLLOW_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

export const deleteFollow = (username) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.unfollow(username)
            dispatch({ type: constant.PROFILE_FOLLOW_RESULT, result })
        } catch (error) {
            dispatch({
                type: constant.PROFILE_FOLLOW_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

