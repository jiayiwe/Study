import * as constant from "../constant"
import request from "../request"

export const getTags = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request.tags.getAll()
            console.log(result);
            dispatch({ type: constant.TAGS_GET_RESULT, result })

        } catch (error) {
            dispatch({
                type: constant.TAGS_GET_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

export const syncTag = (tag) => {
    return {
        type: constant.HOME_TAG_SYNC,
        tag
    }
}

export const syncTab = (tab) => {
    return {
        type: constant.HOME_TAB_SYNC,
        tab
    }
}

export const syncPage = (page) => {
    return {
        type: constant.HOME_PAGE_SYNC,
        page
    }
}

export const homeUnMount = () => {
    return {
        type: constant.HOME_UNMOUNT
    }
}


export const getTabArticles = () => {
    return async (dispatch, getState) => {
        try {
            let { tag, tab, currentPage } = getState().home
            console.log(tag, tab, currentPage);
            let result = {}
            if (tab) {
                if (tab === "follow") {
                    result = await request.article.byFollow(currentPage)
                } else if (tab === "all") {
                    console.log(1);
                    result = await request.article.getAll(currentPage)
                    console.log(result, "222");
                }
            }

            if (tag) {
                result = await request.article.byTag(tag, currentPage)
            }

            dispatch({ type: constant.HOME_article_SYNC, result })

        } catch (error) {
            dispatch({
                type: constant.TAGS_GET_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}
