import { memo } from "react"
import {Link} from "react-router-dom"

const CommentItem = (props) => {
    const { comment, currentUser, deleteComment, slug } = props
    const showDelete = currentUser && comment && currentUser.username === comment.userInfo.username

    return (
        <div className="card">
            {/* 评论内容 */}
            <div className="card-block">
                <p className="card-text">{comment && comment.body}</p>
            </div>
            {/* 评论人信息 */}
            <div className="card-footer">

                <Link to={`/profile/${comment.userInfo.username}`}>
                    <img
                        className="comment-author-img"
                        src={comment.userInfo.avatar || "http://localhost:8000/default.png"}
                        alt={comment.userInfo.username} />
                </Link>
                {" "}
                <Link to={`/profile/${comment.userInfo.username}`}>
                    {comment.userInfo.username}
                </Link>

                {/* 删除按钮 */}
                {
                    showDelete ?
                        <button
                            className="mod-options  btn-dangerous"
                            onClick={() => { deleteComment(slug, comment.id) }}
                        >删除</button> : null
                }

            </div>
        </div>
    )
}


export default memo(CommentItem)