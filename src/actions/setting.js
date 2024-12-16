import * as constant from "../constant"
import request from "../request"

// 设置  同步
export const settingFoiledUpdate = (key, value) => {
    return {
        type: constant.SETTING_FIELD,
        key,
        value
    }
}

// 设置 提交
export const settingSubmit = (user) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.update(user)

            dispatch({ type: constant.SETTING_RESULT, result })

        } catch (error) {
            dispatch({
                type: constant.SETTING_RESULT, result: {
                    status: 0,
                    message: error,
                    errors: error.errors
                }
            })
        }
    }
}

// 设置 清空
export const settingUnload = () => {
    return { type: constant.SETTING_UNLOAD }
}

// 设置 退出
export const settingLogout = () => {
    return { type: constant.USER_LOGOUT }
}
