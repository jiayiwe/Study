import { PureComponent } from "react";
import Banner from "./baner";
import Main from "./main";
import Tags from "./tags";
import { getTags } from "../../actions/home"
import { connect } from "react-redux"

class Home extends PureComponent {
    render() {
        // console.log(this.props.tags);
        return (
            <div className="home-page">
                <Banner />

                <div className="container page">
                    <div className="row">
                        <Main />
                        <div className="col-md-3">
                            <div className="sidebar">
                                <p>热门标签</p>
                                <Tags tags={this.props.tags} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.getTags()
    }
}

const mapState = state => ({
    ...state.home
})

const mapDispatch = dispatch => ({
    getTags: () => dispatch(getTags()),
})

export default connect(mapState, mapDispatch)(Home)