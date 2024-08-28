import React, { useEffect, useState } from 'react'
import {Link,NavLink, useParams} from 'react-router-dom';
import navbarStyle from '../css/NavbarFirst.module.css'
import logo from '../icons/IKReact.ico';
const NavbarFirst = () => {
    const { id } = useParams();

   
  return (
    <nav className={navbarStyle.navbar}>
        <Link className ={navbarStyle.title} to={`/board/${id}`}>  <img src={logo} alt="Logo" className={navbarStyle.logo} /></Link>
        <p> Welcome.</p>
       
        <ul>
        
        <li>
                <NavLink to={`/board/${id}`} className={navbarStyle.active}>Board</NavLink>
            </li>
            <li>
                <NavLink to={`/profile/${id}`} className={navbarStyle.active}>Profile</NavLink>
            </li>
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
