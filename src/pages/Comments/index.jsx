import { PureComponent } from "react";
import { connect } from "react-redux"
import * as action from "../../actions/comment"
import { Link } from "react-router-dom"
import CommentList from "./CommentList";

class Comments extends PureComponent {

    commentFiled = (e) => {
        this.props.commentFiled("body", e.target.value)
    }

    deleteComment = (slug, id) => {
        this.props.deleteComment(slug, id)
    }

    createComment = (e) => {
        e.preventDefault()
        let { slug, body } = this.props
        this.props.createComment(slug, body)
    }

    render() {
        const { slug, comments, currentUser, body } = this.props

        if (!currentUser) {
            return (
                <div className="col-xs-12 col-md-8 offset-md-2">
                    <p>
                        <Link to="/login">登录</Link>
                        &nbsp; or &nbsp;
                        <Link to="/regist">注册</Link>
                    </p>
                </div>
            )
        } else {
            return (
                <div className="col-xs-12 col-md-8 offset-md-2">
                    <form className="card comment-form" onSubmit={this.createComment}>
                        <div className="card-block">
                            <textarea
                                className="form-control"
                                placeholder="添加评论..."
                                rows={3}
                                onChange={this.commentFiled}
                                value={body}
                            />
                        </div>
                        <div className="card-footer">
                            <img alt=""
                                className="comment-author-img"
                                src={(currentUser && currentUser.avatar) || "http://localhost:8000/default.png"}
                            />
                            <button
                                className="btn btn-sm btn-primary"
                                type="submit"
                            >
                                提交
                            </button>
                        </div>
                    </form>
                    {/* 评论列表 */}
                    <CommentList
                        comments={comments}
                        currentUser={currentUser}
                        deleteComment={this.deleteComment}
                        slug={slug}
                    />
                </div>
            )
        }
    }

    componentDidMount() {
        const { slug } = this.props
        this.props.initComment(slug)
    }

}
const mapState = state => ({
    ...state.comment
})
const mapDispatch = dispatch => ({
    initComment: (slug) => dispatch(action.getComment(slug)),
    commentFiled: (key, value) => dispatch(action.commentFoiledUpdate(key, value)),
    createComment: (slug, body) => dispatch(action.createComment(slug, body)),
    deleteComment: (slug, id) => dispatch(action.deleteComment(slug, id))
})

export default connect(mapState, mapDispatch)(Comments)