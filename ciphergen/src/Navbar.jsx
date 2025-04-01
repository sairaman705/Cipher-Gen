import React from "react";
import {Link, NavLink} from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return(
        <nav>
            <div className="logo">
                <i className='bx bx-shield-quarter'></i>
                <p>CipherGen</p>
            </div>
            <ul className="menus">
                <li className="menu-links">
                    <NavLink to='/' className={({isActive}) => isActive ? "active-link": "nav-link"}>Home</NavLink>
                </li>
                <li className="menu-links">
                    <NavLink to='/about' className={({isActive}) => isActive ? "active-link": "nav-link"}>About</NavLink>
                </li>
                <li className="menu-links">
                    <NavLink to='/contact' className={({isActive}) => isActive ? "active-link": "nav-link"}>Contact</NavLink>
                </li>
                <li className="menu-links">
                    <NavLink to='/feedback' className={({isActive}) => isActive ? "active-link": "nav-link"}>Feedback</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;