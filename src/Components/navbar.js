import React, { useState, useEffect } from 'react';
import logo from  "../Assets/Images/Image5.jpg";
import {Link} from "react-router-dom";
import "../CSS/navbar.css";
import { FaTimes, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Link to = "/" className = "logo-link">
        <img className = "logo" src={logo} alt = "Logo" />
      </Link>
      <ul className = {click ? "menu-items active" : "menu-items"}>
        <li className = "menu-item"><Link to = "/">Home</Link></li>
        <li className = "menu-item"><Link to = "/mobiledjservices">Mobile DJ Services</Link></li>
        <li className = "menu-item"><Link to = "/gallery">Gallery</Link></li>
        <li className = "menu-item"><Link to = "/about">About</Link></li>
        <li className = "menu-item"><Link to = "/contact">Contact</Link></li>
      </ul>
      <div className = "hamburger" onClick={handleClick}>
        {click ?(
          <FaTimes size = {20} className = "fa"/>):(
          <FaBars size = {20} className = "fa"/>)}
      </div>
    </nav>
  );
};

export default Navbar;
