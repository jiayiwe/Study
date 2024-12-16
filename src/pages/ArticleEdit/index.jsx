import { PureComponent } from "react";
import Errors from "../../components/Errors"
import { connect } from "react-redux"
import * as action from "../../actions/article"

class ArticleEdit extends PureComponent {

    changeTitle = (e) => {
        this.props.onChangeTitle("title", e.target.value)
    }
    changeDesc = (e) => {
        this.props.onChangeDesc("description", e.target.value)
    }
    changeBody = (e) => {
        this.props.onChangeBody("body", e.target.value)
    }
    changeTag = (e) => {
        this.props.onChangeTag("tag", e.target.value)
    }
    watchEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            this.props.addTag()
        }
    }
    removeTag = (tag) => {
        return (ev) => {
            this.props.removeTag(tag)
        }
    }
    onSubmitForm = (article) => {
        console.log(article);
        this.props.updateArticle(article)
    }

    render() {
        const { title, description, body, tag, tags, errors, slug } = this.props
        return (
            <div className='editor-page'>
                <div className='container page'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 col-xs-12'>
                            <h1>编辑文章</h1>
                            <Errors errors={errors} />

                            <form >
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='文章标题'
                                        value={title || ""}
                                        onChange={this.changeTitle}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='文章描述'
                                        value={description || ""}
                                        onChange={this.changeDesc}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <textarea
                                        className='form-control form-control-lg'
                                        rows={12}
                                        placeholder='用markdown编辑文章'
                                        value={body || ""}
                                        onChange={this.changeBody}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='输入标签'
                                        value={tag || ""}
                                        onChange={this.changeTag}
                                        onKeyUp={this.watchEnter}
                                    />
                                </fieldset>
                                {
                                    tags.map(tag => {
                                        return (
                                            <span key={tag}
                                                className="tag-default tag-pill">
                                                <i className="iconfont icon-denglong"
                                                    onClick={this.removeTag(tag)}
                                                ></i>
                                                {tag}
                                            </span>
                                        )

                                    })
                                }
                                <button
                                    className='btn btn-lg btn-primary pull-xs-right'
                                    type='button'
                                    onClick={
                                        () => {
                                            this.onSubmitForm({ slug, title, description, body, tags })
                                        }
                                    }
                                >
                                    更新文章
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
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
    ...state.article
})
const mapDispatch = dispatch => ({
    onChangeTitle: (key, value) => dispatch(action.artcileFoiledUpdate(key, value)),
    onChangeDesc: (key, value) => dispatch(action.artcileFoiledUpdate(key, value)),
    onChangeBody: (key, value) => dispatch(action.artcileFoiledUpdate(key, value)),
    onChangeTag: (key, value) => dispatch(action.artcileFoiledUpdate(key, value)),

    addTag: () => dispatch(action.artcileAddTag()),
    removeTag: (tag) => dispatch(action.artcileRemoveTag(tag)),

    updateArticle: (article) => dispatch(action.updateArticle(article)),
    onUnload: () => dispatch(action.articleUnload()),

    getArticleBySlug: (slug) => dispatch(action.getArticleBySlug(slug))
})

export default connect(mapState, mapDispatch)(ArticleEdit)