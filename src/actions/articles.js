import { push } from "connected-react-router"
import * as constant from "../constant"
import request from "../request"

export const getArticleByAuthor = (username, page) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.getAuthor(username, page)
            console.log(result);
            dispatch({ type: constant.ARTICLE_GETBYAUTHOR_RESULT, result })
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_GETBYAUTHOR_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

export const getArticleByFavorite = (username, page) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.getFavorite(username, page)
            console.log(result);
            dispatch({ type: constant.ARTICLE_GETBYFAVORITE_RESULT, result })
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_GETBYFAVORITE_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}
