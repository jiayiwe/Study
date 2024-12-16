import { PureComponent } from "react"
import { Link } from "react-router-dom"
import Errors from "../../components/Errors"
import * as action from "../../actions/user"
import { connect } from "react-redux"
import { store } from "../../store"
import { replace } from "connected-react-router"

class Login extends PureComponent {

    onSubmit = (e) => {
        e.preventDefault()
        let { email, password } = this.props
        this.props.onSubmitUser(email, password)
    }
    changeEmail = (e) => {
        this.props.onEmailChange("email", e.target.value)
    }

    changePassword = (e) => {
        this.props.onPassWordChange("password", e.target.value)
    }
    render() {
        let { email, password, errors } = this.props
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1>登录</h1>
                        <p className='text-xs-center'>
                            <Link to="/regist">
                                没有账号前往注册
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
                                登录
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate(preProps) {
        if (this.props.redirect && this.props.redirect !== preProps.redirect) {
            store.dispatch(replace(this.props.redirect))
        }
    }

    componentWillUnmount(){
        this.props.onUnload()
    }
}


const mapState = state => ({
    ...state.user.login
})
const mapDispatch = dispatch => ({
    onEmailChange: (key, value) => dispatch(action.loginFoiledUpdate(key, value)),
    onPassWordChange: (key, value) => dispatch(action.loginFoiledUpdate(key, value)),
    onSubmitUser: (email, password) => dispatch(action.loginSubmit(email, password)),
    onUnload: () => dispatch(action.loginUnload())
})

export default connect(mapState, mapDispatch)(Login)