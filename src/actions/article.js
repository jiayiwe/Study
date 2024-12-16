import { push } from "connected-react-router"
import * as constant from "../constant"
import request from "../request"

// 登录 同步
export const artcileFoiledUpdate = (key, value) => {
    return {
        type: constant.ARTICLE_CREATE_FIELD,
        key,
        value
    }
}

export const articleUnload = () => {
    return { type: constant.ARTICLE_UNLOAD }
}

export const artcileAddTag = () => {
    return { type: constant.ARTICLE_ADD_TAG }
}
export const artcileRemoveTag = (tag) => {
    return { type: constant.ARTICLE_REMOVE_TAG, tag }
}
export const createArticle = (article) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.create(article)
            console.log(result);
            if (result.status === 1) {
                const { slug } = result.data
                dispatch(push(`/article/${slug}`))
            } else {
                dispatch({ type: constant.ARTICLE_CREATE_RESULT, result })
            }
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_CREATE_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

export const getArticleBySlug = (slug) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.get(slug)
            console.log(result);
            dispatch({ type: constant.ARTICLE_GET_RESULT, result })
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_GET_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

// 删除文章
export const deleteArticle = (slug) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.delete(slug)
            if (result.status === 1) {
                dispatch(push("/home"))
            } else {
                dispatch({ type: constant.ARTICLE_DELETE_RESULT, result })
            }
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_DELETE_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

export const updateArticle = (article) => {
    console.log(article);
    return async (dispatch, getState) => {
        try {
            const result = await request.article.update(article)
            if (result.status === 1) {
                const { slug } = result.data
                dispatch(push(`/article/${slug}`))
            } else {
                dispatch({ type: constant.ARTICLE_UPDATE_RESULT, result })
            }
        } catch (error) {
            dispatch({
                type: constant.ARTICLE_UPDATE_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

export const favoriteArticle = (slug) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.favorite(slug)

            dispatch({ type: constant.ARTICLE_FAVORITE_RESULT, result })

        } catch (error) {
            dispatch({
                type: constant.ARTICLE_FAVORITE_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

export const unfavoriteArticle = (slug) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.unfavorite(slug)

            dispatch({ type: constant.ARTICLE_FAVORITE_RESULT, result })

        } catch (error) {
            dispatch({
                type: constant.ARTICLE_FAVORITE_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}