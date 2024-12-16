import { PureComponent } from 'react';
import * as action from "../../actions/profile"
import { connect } from "react-redux"
import ButtonInFo from './ButtoninFo';
import { getArticleByAuthor, getArticleByFavorite } from "../../actions/articles"
import Articles from '../Articles';

class Profile extends PureComponent {
    state = {
        tab: 1
    }
    render() {
        const { profile, currentUser, onFollow, onUnFollow, articleS } = this.props

        const { articles, count, currentPage } = articleS
        const isCurrentUser = currentUser && currentUser.username === profile.username
        return (
            <div className='profile-page'>

                {/* 1 用户信息 */}
                <div className='user-info'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-md-10 offset-md-1'>
                                {/* 1.1 用户基本：头像 用户名 简介 */}
                                <img src={profile.avatar || "http://localhost:8000/default.png"} style={{ width: 100, height: 100 }} alt="" />
                                <h4>{profile.username}</h4>
                                <p> {profile.bio}</p>

                                {/* 1.2 用户行为：自己页面 编辑设置； 不是自己页面 关注/取消关注 */}
                                <ButtonInFo
                                    profile={profile}
                                    isCurrentUser={isCurrentUser}
                                    follow={onFollow}
                                    unfollow={onUnFollow}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 用户文章 : 用户自己的文章  / 用户喜欢的文章*/}
                <div className='container'>
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            {/* 选项卡 */}
                            <div className='aticles-toggle'>
                                <ul className="nav nav-pills outline-active">
                                    <li className='nav-item'>
                                        <button className={this.state.tab === 1 ? "nav-link active" : "nav-link"}
                                            onClick={
                                                () => {
                                                    this.setState({
                                                        tab: 1
                                                    })
                                                    this.props.getArticleByAuthor(profile.username)
                                                }
                                            }
                                        >
                                            我的文章
                                        </button>
                                    </li>
                                    <li className='nav-item'>
                                        <button className={this.state.tab === 2 ? "nav-link active" : "nav-link"}
                                            onClick={
                                                () => {
                                                    this.setState({
                                                        tab: 2
                                                    })
                                                    this.props.getArticleByFavorite(profile.username)
                                                }
                                            }
                                        >

                                            喜欢文章
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* 文章列表 */}
                            {
                                <Articles
                                    articles={articles}
                                    count={count}
                                    currentPage={currentPage}
                                    isShowPage={true}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const username = this.props.match.params.username
        this.props.getProfile(username)
        this.props.getArticleByAuthor(username)
    }

    componentDidUpdate() {
        const username = this.props.match.params.username
        if (username && username !== this.props.profile.username) {
            this.props.getProfile(username)
        }
    }
}

const mapState = state => ({
    profile: state.profile,
    currentUser: state.user.login.currentUser,
    articleS: state.articles
})
const mapDispatch = dispatch => ({
    getProfile: (username) => dispatch(action.getProfile(username)),
    onFollow: (username) => dispatch(action.addFollow(username)),
    onUnFollow: (username) => dispatch(action.deleteFollow(username)),
    getArticleByAuthor: (username) => dispatch(getArticleByAuthor(username, 1)),
    getArticleByFavorite: (username) => dispatch(getArticleByFavorite(username, 1)),
})

export default connect(mapState, mapDispatch)(Profile)