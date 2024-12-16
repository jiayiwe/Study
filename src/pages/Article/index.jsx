import { PureComponent } from "react";
import { connect } from "react-redux"
import * as  action from "../../actions/article"
import { Link } from "react-router-dom"
import ArticleActionButton from "./ArticleActionButton";
import { marked } from "marked"
import Comments from "../Comments";

class Article extends PureComponent {
    render() {
        const { article, currentUser } = this.props
        // eslint-disable-next-line no-unused-vars
        const { slug, title, description, body, tags, author } = article

        if (!body) {
            return null
        }

        const markdata = body
        const markhtml = marked.parse(markdata, { sanitize: true })
        const markObj = { __html: markhtml }

        return (
            <div className='article-page'>
                {/* 文章头信息 */}
                <div className='banner'>
                    <div className='container'>
                        <h1>{title}</h1>
                        <div className='article-meta'>
                            <div className="info">
                                <Link to={`/profile/${author && author.username}`}>
                                    <img src={(author && author.avatar) || "http://localhost:8000/default.png"} alt={author && author.username} />
                                </Link>
                            </div>
                            <div className="info">
                                <Link to={`/profile/${author && author.username}`}>
                                    {author && author.username}
                                </Link>
                                {"  "}
                            </div>

                            {/* button :行为 */}
                            <ArticleActionButton article={article} currentUser={currentUser} />
                        </div>

                    </div>
                </div>
                {/* 文章信息：内容和标签 */}
                <div className="row article-content">
                    <div className="col-xs-12">
                        <div dangerouslySetInnerHTML={markObj}></div>

                        <ul className="tag-list">
                            {
                                tags.map(tag => {
                                    return (
                                        <li className="tag-default tag-pill" key={tag}>
                                            {tag}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                {/* 文章评论 */}
                {/* 
                  评论信息 ： 
                  未登录 ： 登录和注册 / 评论列表
                  已登录 ： 添加评论 / 评论列表
                */}
                <Comments slug={slug} currentUser={currentUser} />
            </div>
        )
    }
    componentDidMount() {
        const slug = this.props.match.params.slug

        this.props.getArticleBySlug(slug)
    }
    componentWillUnmount() {
        this.props.onUnload()
    }
}

const mapState = state => ({
    article: state.article,
    currentUser: state.user.login.currentUser
})
const mapDispatch = dispatch => ({
    getArticleBySlug: slug => dispatch(action.getArticleBySlug(slug)),
    onUnload: () => dispatch(action.articleUnload())
})

export default connect(mapState, mapDispatch)(Article)