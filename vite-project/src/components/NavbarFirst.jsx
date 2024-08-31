import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams, useNavigate } from 'react-router-dom';
import navbarStyle from '../css/NavbarFirst.module.css'
import logo from '../icons/IKReact.ico';
const NavbarFirst = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const userData = JSON.parse(localStorage.getItem('user'));
    const ADMIN_ACCESS = userData.role === "Admin";
    const currentUserUsername = userData.username;

    return (
        <nav className={navbarStyle.navbar}>
            <Link className={navbarStyle.title} to={`/board/${id}`}>  <img src={logo} alt="Logo" className={navbarStyle.logo} /></Link>
            <p className={navbarStyle.titleWelcom}> Welcome.</p>

            <ul>

                <li>
                    <NavLink to={`/board/${id}`} className={navbarStyle.active}>Board</NavLink>
                </li>
                <li>
                    <NavLink
                        to={`/profile/${id}`}
                        state={{ username: currentUserUsername }}
                        className={navbarStyle.active}
                    >
                        Profile
                    </NavLink>
                </li>
                {ADMIN_ACCESS &&
                    <li>
                        <NavLink to={`/users`} className={navbarStyle.active}>Users</NavLink>
                    </li>}
                <li>
                    <NavLink to={`/contact/${id}`} className={navbarStyle.active}>Contact</NavLink>
                </li>
                <li>
                    <NavLink to={`/quiz/${id}`} className={navbarStyle.active}>Quiz</NavLink>
                </li>
                <li>
                    <NavLink to={`/login`} className={navbarStyle.active} >LogOut</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavbarFirst;
