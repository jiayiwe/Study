import * as constant from "../../../constant"
import { saveData, getData, deleteData } from "../../../utils/localstorage"

const initUser = () => {
    const currentUser = getData("currentUser")
    if (currentUser) {
        return currentUser
    }
    return null
}

const initToken = () => {
    const token = getData("token")
    if (token) {
        return token
    }
    return null
}

const initState = {
    ...initUser(),
    errors: null,
    token: initToken(),
    currentUser: initUser()
}

const settingReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_LOGOUT:
            state = {}
            deleteData("currentUser")
            deleteData("token")
            return { ...state, redirect: "/login" }
        case constant.SETTING_UNLOAD:
            return { ...initState, currentUser: initUser(), token: initToken() }
        case constant.SETTING_FIELD:
            const key = action.key
            const value = action.value
            return { ...state, [key]: value };
        case constant.SETTING_RESULT:
            const { status, message, data } = action.result
            if (status === 1) {
                let currentUser = null
                let token = null
                currentUser = data
                token = data.token
                saveData("currentUser", currentUser)
                saveData("token", token)
                return { ...state, ...data, currentUser }
            } else {
                return { ...state, errors: { message } }
            }

        default:
            return {
                ...initUser(),
                errors: null,
                token: initToken,
                currentUser: initUser()
            };
    }
}

export default settingReducer