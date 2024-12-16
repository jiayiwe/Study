import { push } from "connected-react-router"
import * as constant from "../constant"
import request from "../request"

//  同步
export const commentFoiledUpdate = (key, value) => {
    return {
        type: constant.COMMENT_CREATE_FIELD,
        key,
        value
    }
}


export const createComment = (slug, body) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.comment.create(slug, body)
            console.log(result);

            dispatch({ type: constant.COMMENT_CREATE_RESULT, result })

        } catch (error) {
            dispatch({
                type: constant.COMMENT_CREATE_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

export const getComment = (slug) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.comment.get(slug)
            // console.log(result);

            dispatch({ type: constant.COMMENT_GET_RESULT, result })

        } catch (error) {
            dispatch({
                type: constant.COMMENT_GET_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

export const deleteComment = (slug,id) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.comment.delete(slug,id)
            console.log(result);
            dispatch({ type: constant.COMMENT_DELETE_RESULT, result:{...result,id} })

        } catch (error) {
            dispatch({
                type: constant.COMMENT_DELETE_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}
