import { Component } from "react";
import { connect } from "react-redux"
import * as action from "../../actions/setting"

class SettingForm extends Component {

    changeBio = (e) => {
        this.props.onBioChange("bio", e.target.value)
    }
    changeUserName = (e) => {
        this.props.onUserNameChange("username", e.target.value)
    }
    changePassword = (e) => {
        this.props.onPassWordChange("password", e.target.value)
    }
    changeAvatar = (e) => {
        this.props.onAvatarChange("avatar", e.target.value)
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { password, username, bio, avatar } = this.props
        this.props.onSubmitUser({ bio, avatar, password, username })
    }

    render() {
        const { username, password, avatar, bio } = this.props
        return (
            <form onSubmit={this.onSubmit}>
                <fieldset className='form-group'>
                    <input
                        className='form-control form-control-lg'
                        type="text"
                        placeholder='用户名称'
                        value={username || ""}
                        onChange={this.changeUserName}
                        disabled
                    />
                </fieldset>
                <fieldset className='form-group'>
                    <input
                        className='form-control form-control-lg'
                        type="text"
                        placeholder='用户头像'
                        value={avatar || ""}
                        onChange={this.changeAvatar}
                    />
                </fieldset>
                <fieldset className='form-group'>
                    <textarea
                        className='form-control form-control-lg'
                        rows='8'
                        placeholder='用户简介'
                        value={bio || ""}
                        onChange={this.changeBio}
                    />
                </fieldset>
                <fieldset className='form-group'>
                    <input
                        className='form-control form-control-lg'
                        type="password"
                        placeholder='用户密码'
                        value={password || ""}
                        onChange={this.changePassword}
                    />
                </fieldset>
                <button
                    className='btn btn-lg btn-primary pull-xs-right'
                    type='submit'
                >
                    更新
                </button>
            </form>
        )
    }
}

const mapState = state => ({
    ...state.user.setting
})
const mapDispatch = dispatch => ({
    onAvatarChange: (key, value) => dispatch(action.settingFoiledUpdate(key, value)),
    onBioChange: (key, value) => dispatch(action.settingFoiledUpdate(key, value)),
    onUserNameChange: (key, value) => dispatch(action.settingFoiledUpdate(key, value)),
    onPassWordChange: (key, value) => dispatch(action.settingFoiledUpdate(key, value)),
    onSubmitUser: (user) => dispatch(action.settingSubmit(user))
})


export default connect(mapState, mapDispatch)(SettingForm) 