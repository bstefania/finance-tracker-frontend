import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
        <Logo />
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
    </nav>
  )
}


export default Navbar;