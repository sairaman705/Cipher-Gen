import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <img src="./Images/cipherGenLogo.png" alt="" />
        <p>CipherGen</p>
      </div>
      <ul className="menus">
        <li>
          <a href="#about" className="nav-link">
            About Us
          </a>
        </li>
        <li>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </li>
        <li>
          <a href="#faq" className="nav-link">
            FAQ
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
