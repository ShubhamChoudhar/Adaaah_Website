import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
        <p>We provide services for Arts and DJ. Contact us for further information</p>
        <h4 className="copyright">Copyright &copy; 2023 Adaaah - All Rights Reserved.</h4>
        <ul className="footer-links">
        <li><Link to = "/">Home</Link></li>
          <li><Link to = "/mobile-dj-services">Mobile DJ Services</Link></li>
          <li><Link to = "/about">About</Link></li>
          <li><Link to = "/gallery">Gallery</Link></li>
          <li><Link to = "/contact">Contact</Link></li>
        </ul>
    </footer>
  );
};

export default Footer;
