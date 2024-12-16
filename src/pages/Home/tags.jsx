import { PureComponent } from "react";
import { connect } from "react-redux"
import { syncPage, syncTab, syncTag, getTabArticles } from "../../actions/home"

class Tags extends PureComponent {
    render() {
        let { tags } = this.props
        if (tags) {
            return (
                <div className="tag-list">
                    {
                        tags.map(tag => {
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    className="tag-default tag-pill"
                                    onClick={
                                        () => {
                                            this.props.syncPage(1)
                                            this.props.syncTab(tag)
                                            this.props.syncTag(tag)
                                            this.props.onTabClick()
                                        }
                                    }
                                >
                                    {tag}
                                </button>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <div>加载标签中。。。。</div>
            )
        }
    }
}

const mapDispatch = dispatch => ({
    syncPage: (page) => dispatch(syncPage(page)),
    syncTab: (tab) => dispatch(syncTab(tab)),
    syncTag: (tag) => dispatch(syncTag(tag)),
    onTabClick: () => dispatch(getTabArticles())
})

export default connect(null, mapDispatch)(Tags)