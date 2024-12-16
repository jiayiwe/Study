import { Link } from "react-router-dom"
import { memo } from "react"
import *  as action from "../../actions/article"
import { connect } from "react-redux"

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const ArticleActionButton = memo(props => {
    const { article, currentUser } = props
    const { slug, author } = article
    if (currentUser) {
        // 校验 登录的人 
        const isMe = currentUser && author && currentUser.username === author.username
        if (isMe) {
            return (
                <span>
                    <Link to={`/article/edit/${slug}`}>
                        <i className="iconfont icon-ziliao"></i> 编辑
                    </Link>
                    {" "}
                    <button
                        className="btn  btn-outline-danger btn-sm"
                        onClick={() => {
                            props.deleteArticle(slug)
                        }}
                    >
                        <i className="iconfont icon-denglong"></i> 删除
                    </button>
                </span>
            )
        } else {
            return (
                <button
                    className={article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}
                    onClick={() => {
                        if (article.favorited) {
                            props.unfavoriteArticle(slug)
                        } else {
                            props.favoriteArticle(slug)
                        }
                    }}
                >
                    <i className="iconfont icon-xihuan"></i> {article.favoriteCount}
                </button>
            )
        }
    } else {
        return (
            // <button className="btn  btn-outline-danger btn-sm"
            //     onClick={() => {
            //         console.log('重定向到登录页面');
            //     }}>
            // </button>
            // 自由发挥 。。。  
            <Link to="/login">当前未登录 请前往登录</Link>
        )
    }
})

const mapDispatch = dispatch => ({
    deleteArticle:slug=>dispatch(action.deleteArticle(slug)),
    unfavoriteArticle:slug=>dispatch(action.unfavoriteArticle(slug)),
    favoriteArticle:slug=>dispatch(action.favoriteArticle(slug))
})

export default connect(null, mapDispatch)(ArticleActionButton)