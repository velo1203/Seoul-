import React from 'react';
import './css/Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className='nav-container'>
                <div className="navbar-logo">공구 대여 서비스</div>
                <ul className="navbar-menu">
                    <li><a href="/">홈</a></li>
                    <li><a href="/search">검색</a></li>
                    <li><a href="/locations">대여소 위치</a></li>
                    <li><a href="/about">서비스 소개</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
