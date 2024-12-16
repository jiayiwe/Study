import * as constant from "../../../constant"
import { saveData, getData } from "../../../utils/localstorage"

const initUser = () => {
    const currentUser = getData("currentUser")
    if (currentUser) {
        return currentUser
    }
    return null
}

const initState = {
    email: "",
    username: "",
    password: "",
    errors: null,
    currentUser: initUser(),
    token: null
}


const userReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_LOGOUT:
            state.currentUser = null
            return { ...state }
        case constant.USER_LOGIN_UNLOAD:
            return { ...initState,currentUser: initUser() }
        case constant.USER_LOGIN_FIELD:
            const key = action.key
            const value = action.value
            return { ...state, [key]: value };
        case constant.USER_LOGIN_RESULT:
            const { status, message, data } = action.result
            if (status === 1) {
                let currentUser = data
                let token = data.token
                saveData("currentUser", currentUser)
                saveData("token", token)
                return { ...state, ...data, currentUser, redirect: "/" }
            } else {
                return { ...state, errors: { message } }
            }
        default:
            return state;
    }
}

export default userReducer