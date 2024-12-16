import { memo } from "react"
import { Link } from "react-router-dom"

const ButtonInFo = memo((props) => {
    const { profile, isCurrentUser, follow, unfollow } = props

    const handleClick = (e) => {
        e.preventDefault()
        if (profile.following) {
            unfollow(profile.username)
        } else {
            follow(profile.username)
        }
    }
    if (isCurrentUser) {
        return (
            <Link to="/setting" className="btn btn-sm btn-outline-secondary action-btn">
                <i className="iconfont icon-zhuanchezhuanyongbeifen"></i>&nbsp;编辑设置
            </Link>
        )
    } else {
        return (
            <button className={profile.following ? 'btn-secondary' : 'btn-outline-secondary'}
                onClick={handleClick}>
                <i className="iconfont icon-xihuan"></i>&nbsp;
                {
                    profile.following ? "取消关注" : "添加关注"
                }
            </button>
        )
    }
})

export default ButtonInFo