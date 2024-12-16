import { PureComponent } from "react";
import Errors from "../../components/Errors";
import SettingForm from "./SettingForm";
import { connect } from "react-redux"
import * as action from "../../actions/setting"
import { store } from "../../store"
import { replace } from "connected-react-router"

class Setting extends PureComponent {

    handleClick = () => {
        this.props.onClickLogout()
    }
    render() {
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1 className='text-xs-center'>设置</h1>

                        <Errors errors={this.props.errors} />

                        <SettingForm />

                        <button
                            className='btn btn-outline-danger'
                            onClick={this.handleClick}
                        >
                            退出
                        </button>
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

    componentWillUnmount() {
        this.props.onUnload()
    }
}

const mapState = state => ({
    ...state.user.setting
})

const mapDispatch = dispatch => ({
    onClickLogout: () => dispatch(action.settingLogout()),
    onUnload: () => dispatch(action.settingUnload())
})

export default connect(mapState, mapDispatch)(Setting)