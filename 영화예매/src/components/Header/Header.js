import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = ()=>{
    return(
        <header className="header">
            <div className="logo">
                <Link to="/">영화 예매 사이트</Link>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/movies">영화</Link> </li>
                    <li><Link to="/reserve">예매</Link> </li>

                    {/*  로그인 기능은 나중에 구현 예정*/}
                    <li><a href="#!">로그인</a> </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;