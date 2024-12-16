import { PureComponent, memo } from "react";
import { connect } from "react-redux"
import { syncPage, syncTab, syncTag, homeUnMount, getTabArticles } from "../../actions/home"
import Articles from "../Articles";

let AllTab = memo((props) => {
    let { currentUser, tab, onTabClick } = props

    let hanleClick = e => {
        e.preventDefault()
        onTabClick("all", 1)
    }

    if (!currentUser) {
        return null
    } else {
        return (
            <li className="nav-item">
                <button type="button"
                    className={tab === "all" ? "nav-link active" : "nav-link"}
                    onClick={hanleClick}
                >
                    全部
                </button>
            </li>
        )
    }
})

let TagTab = memo((props) => {
    let { tag } = props

    if (!tag) {
        return null
    } else {
        return (
            <li className="nav-item">
                <button type="button"
                    className={"nav-link active"}
                >
                    {tag}
                </button>
            </li>
        )
    }
})


class Main extends PureComponent {

    handleClick = (tab, page) => {
        this.props.syncPage(page)
        this.props.syncTab(tab)
        this.props.syncTag(null)
        this.props.onTabClick()
    }

    handlePageClick = (pageNum) => {
        this.props.syncPage(pageNum)
        this.props.onTabClick()
    }

    render() {
        return (
            <div className="col-md-9">
                <div className="feet-toggle">
                    <ul className='nav nav-pills outline-active'>
                        <AllTab currentUser={this.props.currenUser} tab={this.props.tab}
                            onTabClick={this.handleClick} />
                        <TagTab tag={this.props.tag} />
                    </ul>
                </div>
                <Articles
                    articles={this.props.articles}
                    count={this.props.count}
                    currentPage={this.props.currentPage}
                    isShowPage={true}
                    onPageClick={this.handlePageClick}
                />
            </div>
        )
    }

    componentDidMount() {
        if (this.props.currentUser) {
            this.props.syncPage(1)
            this.props.syncTab("all")
            this.props.onTabClick()
        }
    }

    componentWillUnmount() {
        this.props.onUnMount()
    }
}


const mapState = state => ({
    ...state.home,
    ...state.user.login
})

const mapDispatch = dispatch => ({
    syncPage: (page) => dispatch(syncPage(page)),
    syncTab: (tab) => dispatch(syncTab(tab)),
    syncTag: (tag) => dispatch(syncTag(tag)),
    onTabClick: () => dispatch(getTabArticles()),
    onUnMount: () => dispatch(homeUnMount())
})

export default connect(mapState, mapDispatch)(Main)
