import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                {/* <img src="/path/to/nids-logo.png" alt="NIDS System Logo" /> */}
              <Link to="/">  <h3 className='nid-logo-head'>NidTech</h3></Link>
            </div>
            <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <NavLink to="/predict" activeClassName="active">Predict</NavLink>
                <NavLink to="/about-us" activeClassName="active">About Us</NavLink>
                <NavLink to="/privacy" activeClassName="active">Privacy</NavLink>
                {/* <NavLink to="/contact" activeClassName="active">Contact</NavLink> */}
            </div>
            <div className="navbar-hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
