import * as constant from "../../constant"


const initState = {
    username: "",
    bio: "",
    avatar: "",
    errors: null,
    followers: [],
    following: false
}

const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.PROFILE_GET_RESULT:
            const { status, message, data } = action.result
            if (status === 1) {
                return { ...state, ...data }
            } else {
                return { ...state, errors: { message } }
            }
        case constant.PROFILE_FOLLOW_RESULT:
            if (action.result.status === 1) {
                return { ...state, ...action.result.data }
            } else {
                return { ...state, errors: { ...action.result.message } }
            }
        default:
            return state;
    }
}

export default profileReducer