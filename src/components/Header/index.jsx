import { Component } from "react";
import { Link } from "react-router-dom"
import Menu from "./menu";

export default class Header extends Component {
    render() {
        return (
            <nav className='navbar navbar-light'>
                <div className='container'>
                    {/* 左侧：logo */}
                    <Link to="/" className='navbar-brand'>
                        BLOG-V1
                    </Link>
                    {/* 右侧 */}
                    <Menu />
                </div>
            </nav>
        )
    }
}