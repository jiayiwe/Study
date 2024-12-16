import * as constant from "../../constant"


const initState = {
    body: "",
    errors: null,
    comments: []
}

const commentReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.COMMENT_CREATE_FIELD:
            const key = action.key
            const value = action.value
            return { ...state, [key]: value };
        case constant.COMMENT_GET_RESULT:
            if (action.result.status === 1) {
                const comments = action.result.data
                return { ...state, comments, body: "" }
            } else {
                return { ...state, body: "", errors: { ...action.result.message } }
            }
        case constant.COMMENT_CREATE_RESULT:
            if (action.result.status === 1) {
                const comment = action.result.data
                const newComments = state.comments.concat([comment])
                return { ...state, comments: newComments, body: "" }
            } else {
                return { ...state, body: "", errors: { ...action.result.message } }
            }
        case constant.COMMENT_DELETE_RESULT:
            if (action.result.status === 1) {
                const deleteId = action.result.id
                const deleteResult = state.comments.filter(comment => {
                    return comment.id !== deleteId
                })
                console.log(deleteResult);
                return { ...state, comments: deleteResult, body: "" }
            } else {
                return { ...state, body: "", errors: { ...action.result.message } }
            }
        default:
            return state;
    }
}

export default commentReducer