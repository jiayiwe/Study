import { PureComponent } from "react"
import { Link } from "react-router-dom"
import Errors from "../../components/Errors"
import * as action from "../../actions/user"
import { connect } from "react-redux"

class Regist extends PureComponent {

    onSubmit = (e) => {
        e.preventDefault()
        const { email, password, username } = this.props
        this.props.onSubmitUser({ email, password, username })
    }
    changeEmail = (e) => {
        this.props.onEmailChange("email", e.target.value)
    }
    changeUserName = (e) => {
        this.props.onUserNameChange("username", e.target.value)
    }
    changePassword = (e) => {
        this.props.onPassWordChange("password", e.target.value)
    }
    render() {
        let { email, password, username, errors } = this.props
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1>注册</h1>
                        <p className='text-xs-center'>
                            <Link to="/login">
                                有账号直接登录？
                            </Link>
                        </p>
                        <Errors errors={errors} />
                        <form onSubmit={this.onSubmit}>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户邮箱'
                                    value={email}
                                    onChange={this.changeEmail}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户名称'
                                    value={username}
                                    onChange={this.changeUserName}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="password"
                                    placeholder='用户密码'
                                    value={password}
                                    onChange={this.changePassword}
                                />
                            </fieldset>
                            <button
                                className='btn btn-lg btn-primary pull-xs-right'
                                type='submit'
                            >
                                注册
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        this.props.onUnload()
    }
}

const mapState = state => ({
    ...state.user.regist
})
const mapDispatch = dispatch => ({
    onEmailChange: (key, value) => dispatch(action.registFoiledUpdate(key, value)),
    onUserNameChange: (key, value) => dispatch(action.registFoiledUpdate(key, value)),
    onPassWordChange: (key, value) => dispatch(action.registFoiledUpdate(key, value)),
    onSubmitUser: (user) => dispatch(action.registSubmit(user)),
    onUnload: () => dispatch(action.registUnload())
})

export default connect(mapState, mapDispatch)(Regist)