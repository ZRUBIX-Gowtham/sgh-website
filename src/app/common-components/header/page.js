'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBars, faPhoneAlt, faEnvelope, faMapMarkerAlt, faShieldAlt, 
    faPlus, faMinus, faChevronDown, faTimes 
} from '@fortawesome/free-solid-svg-icons'; 
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link'; // Import Link from next/link


function Header() {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isContactOverlayOpen, setIsContactOverlayOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname(); // Get the current path

    const sideMenuRef = useRef(null);
    const contactOverlayRef = useRef(null);

    const openSideMenuRef = useRef(null);
    const openContactOverlayRef = useRef(null);

    const menuItems = [
        { name: 'Home', link: '/' },
        { 
            name: 'About', 
            link: '/about', 
            dropdown: [
                { name: 'Insurance', link: '/insurance' },
                { name: 'Privacy Policy', link: '/privacy-policy' },
            ]
        },
        { name: 'Departments', link: '/departments' },
        { name: 'Labs', link: '/our-labs' },
        { name: 'Find Doctor', link: '/doctors' },
        // { 
        //     name: 'Books', 
        //     // link: '#', 
        //     dropdown: [
        //         { name: 'Tamil Books', link: '/book' },
        //         { name: 'English Books', link: '/' },
        //     ]
        // },
        // { name: 'Blog', link: '/blogs' },
    ];

    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
        if (isSideMenuOpen) {
            setActiveDropdown(null);
        }
    };

    const toggleContactOverlay = () => {
        setIsContactOverlayOpen(!isContactOverlayOpen);
    };

    const handleSideMenuDropdownClick = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleSideMenuLinkClick = () => {
        setIsSideMenuOpen(false);
        setActiveDropdown(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideMenuRef.current && !sideMenuRef.current.contains(event.target) && 
                openSideMenuRef.current && !openSideMenuRef.current.contains(event.target) && isSideMenuOpen) {
                setIsSideMenuOpen(false);
                setActiveDropdown(null);
            }
            if (contactOverlayRef.current && !contactOverlayRef.current.contains(event.target) && 
                openContactOverlayRef.current && !openContactOverlayRef.current.contains(event.target) && isContactOverlayOpen) {
                setIsContactOverlayOpen(false);
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSideMenuOpen, isContactOverlayOpen]); 

    return (
        <>
           <style>{`
                :root {
                    --primary-color: #007bff;
                    --secondary-color: #6c757d;
                    --text-color: #274760;
                    --light-bg: #f8f9fa;
                    --white: #ffffff; 
                    --shadow: rgba(0, 0, 0, 0.1);
                    --transition-speed: 0.3s;
                }

            
                .navbar {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 15px 0px;
                    z-index: 1000;
                    background-color: transparent; 
                    box-shadow: none;
                    height: 80px;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 1000;
                    transition: background-color var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
                }

                .navbar-brand {
                    display: flex;
                    align-items: center;
                    font-size: 28px;
                    font-weight: 700;
                    color: var(--text-color); 
                    text-decoration: none;
                    letter-spacing: -0.5px;
                    transition: color var(--transition-speed) ease;
                }
                .navbar-brand img {
                    height: 35px;
                    margin-right: 10px;
                }
               .navbar-nav {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    align-items: center;
                    justify-content: center;
                }
                .nav-item {
                    margin-left: 35px;
                    position: relative;
                }
                .nav-link {
                    color: var(--text-color); 
                    text-decoration: none;
                    font-size: 18px;
                    font-weight : 700;
                    padding: 5px 0;
                    transition: color var(--transition-speed) ease, transform var(--transition-speed) ease;
                    display: inline-block;
                    position: relative;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2.5px;
                    bottom: 0;
                    left: 0;
                    background-color: #274760;
                    transition: width var(--transition-speed) ease-out;
                }
                .nav-link:hover::after,
                .nav-link.active::after { /* Added .active class */
                    width: 70%;
                }
                .nav-link:hover {
                 
                    transform: translateY(-2px);
                }
                .nav-link:hover::after {
                    width: 70%;
                }

                /* Desktop Styles for the dropdown arrow */
                .nav-item.has-dropdown > .nav-link {
                    display: flex;
                    align-items: center;
                }
                .nav-item.has-dropdown > .nav-link .dropdown-arrow-icon {
                    font-size: 12px;
                    margin-left: 8px;
                    color: #274760; 
                    transition: transform var(--transition-speed) ease, color var(--transition-speed) ease;
                }
                .nav-item.has-dropdown:hover > .nav-link .dropdown-arrow-icon {
                    transform: rotate(180deg);
                }

                .dropdown-menu {
                    position: absolute;
                    background-color: var(--white);
                    min-width: 220px;
                    box-shadow: 0px 8px 20px 0px var(--shadow);
                    z-index: 2;
                    list-style: none;
                    padding: 10px 0;
                    margin-top: 5px;
                    border-radius: 8px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(10px);
                    transition: opacity var(--transition-speed) ease 1s, transform var(--transition-speed) ease 1s, visibility 0s linear 0.3s;
                }
                .nav-item.has-dropdown:hover .dropdown-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                    transition-delay: 0s;
                }
                .dropdown-menu li a {
                    color: var(--text-color);
                    padding: 12px 20px;
                    text-decoration: none;
                    display: block;
                    font-size: 18px; /* Updated font size */
                    font-weight: 700; /* Added font weight */
                    transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease;
                }
                .dropdown-menu li a:hover {
                    background-color: var(--light-bg);
                    color: var(--primary-color);
                    padding-left: 25px;
                }
              
                .navbar-icons {
                    display: flex;
                    align-items: center;
                }
                .navbar-icons .icon {
                    font-size: 24px;
                    color: #274760; 
                    margin-left: 25px;
                    cursor: pointer;
                    transition: color var(--transition-speed) ease, transform var(--transition-speed) ease;
                }
                .navbar-icons .icon:hover {
                    color: var(--primary-color);
                    transform: scale(1.1);
                }
              
                /* Hide desktop menu on smaller screens */
                @media (max-width: 992px) {
                    .navbar-nav {
                        display: none;
                    }
                    .navbar {
                        padding: 15px 0px;
                     
                    }
                    .navbar-icons .icon:not(.menu-icon) {
                        margin-left: 15px;
                    }
                    /* Hide desktop contact icon on mobile */
                    .navbar-icons .desktop-contact-icon {
                        display: none;
                    }
                    /* Show mobile menu icon on mobile */
                    .navbar-icons .menu-icon {
                        display: block;
                    }
                }

                /* Hide mobile menu icon on desktop */
                @media (min-width: 993px) {
                    .navbar-icons .menu-icon {
                        display: none;
                    }
                }

                /* Scrolled state styles */
                .navbar.scrolled {
                    background-color: var(--white); 
                    box-shadow: 0 2px 10px var(--shadow);
                }
                .navbar.scrolled .navbar-brand {
                    color: var(--text-color); 
                }
                .navbar.scrolled .nav-link {
                    color: var(--text-color); 
                }
                .navbar.scrolled .nav-link::after {
                    background-color: #274760; /* Ensure underline color is primary color when scrolled */
                    height: 2.5px;
                }
                .navbar.scrolled .nav-item.has-dropdown > .nav-link .dropdown-arrow-icon {
                    color: #274760; 
                }
                .navbar.scrolled .navbar-icons .icon {
                    color: #274760; 
                }


                /* Side Menu Styles (for mobile navigation) */
                .side-menu {
                    height: 100%;
                    width: 0;
                    position: fixed;
                    z-index: 1001;
                    top: 0;
                    right: 0;
                    background-color: var(--white);
                    overflow-x: hidden;
                    transition: width 0.5s cubic-bezier(0.7, 0, 0.3, 1);
                    padding-top: 80px;
                    box-shadow: -5px 0 15px var(--shadow);
                    display: flex;
                    flex-direction: column;
                }

                .side-menu.open {
                    width: 300px;
                }

                @media (max-width: 480px) {
                    .side-menu.open {
                        width: 100%;
                    }
                }

                .side-menu .closebtn {
                    position: absolute;
                    top: 20px;
                    right: 25px;
                    font-size: 40px;
                    color: var(--secondary-color);
                    text-decoration: none;
                    transition: color var(--transition-speed) ease;
                    cursor: pointer;
                }
                .side-menu .closebtn:hover {
                    color: var(--primary-color);
                }

                .side-menu-nav {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    flex-grow: 1;
                }

                .side-menu-nav .nav-item {
                    margin: 0;
                    width: 100%;
                    border-bottom: 1px solid var(--light-bg);
                }

                .side-menu-nav .nav-item:last-child {
                    border-bottom: none;
                }

                .side-menu-nav .nav-link {
                    padding: 18px 25px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: var(--text-color);
                    text-decoration: none;
                    font-size: 19px;
                    transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease;
                }

                .side-menu-nav .nav-link:hover {
                    background-color: var(--light-bg);
                    color: var(--primary-color);
                }
                .side-menu-nav .nav-link.active { /* Added .active class for side menu */
                    background-color: var(--light-bg);
                    color: var(--primary-color);
                }
                .side-menu-nav .nav-link.active::after { /* Ensure underline for active side menu link */
                    width: 100%;
                }

                /* Side menu dropdown indicator */
                .side-menu-nav .nav-item.has-dropdown > .nav-link .dropdown-icon {
                    font-size: 18px;
                    margin-left: 15px;
                    color: var(--secondary-color);
                    transition: transform var(--transition-speed) ease;
                }

                .side-menu-nav .nav-item.has-dropdown.active > .nav-link .dropdown-icon {
                    transform: rotate(180deg);
                    color: var(--primary-color);
                }

                .side-menu-dropdown-menu {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    background-color: #f3f3f3;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.4s ease-out;
                }

                .side-menu-nav .nav-item.has-dropdown.active .side-menu-dropdown-menu {
                    max-height: 500px;
                }

                .side-menu-dropdown-menu li a {
                    padding: 12px 50px;
                    color: var(--text-color);
                    text-decoration: none;
                    display: block;
                    font-size: 18px; /* Updated font size */
                    font-weight: 700; /* Added font weight */
                    transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease;
                }

                .side-menu-dropdown-menu li a:hover {
                    background-color: #e9e9e9;
                    color: var(--primary-color);
                }

                /* Contact Overlay Styles */
                .contact-overlay {
                    height: 100%;
                    width: 0;
                    position: fixed;
                    z-index: 1002;
                    top: 0;
                    right: 0;
                    background-color: var(--white);
                    overflow-y: auto;
                    opacity: 0;
                    visibility: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    text-align: center;
                    transition: opacity 0.4s ease, visibility 0.4s ease, width 0.4s cubic-bezier(0.7, 0, 0.3, 1);
                }

                .contact-overlay.active {
                    opacity: 1;
                    visibility: visible;
                    width: 500px;
                    box-shadow: -5px 0 15px var(--shadow);
                }

                @media (max-width: 768px) {
                    .contact-overlay.active {
                        width: 100%;
                    }
                }

                .contact-overlay .closebtn {
                    position: absolute;
                    top: 20px;
                    right: 25px;
                    font-size: 40px;
                    color: #274760;
                    text-decoration: none;
                    transition: color var(--transition-speed) ease;
                    cursor: pointer;
                }
                .contact-overlay .closebtn:hover {
                    color: var(--primary-color);
                }

                .contact-overlay-content {
                    padding: 30px;
                    color: var(--text-color);
                    width: 100%;
                    box-sizing: border-box;
                    max-width: 400px;
                }

                .contact-overlay-content .logo-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 25px;
                    padding-bottom: 25px;
                    border-bottom: 1px solid var(--light-bg);
                }

                .contact-overlay-content .logo-section svg {
                    font-size: 35px;
                    color: var(--primary-color);
                    margin-right: 12px;
                }

                .contact-overlay-content .logo-section h3 {
                    font-size: 28px;
                    margin: 0;
                    color: var(--text-color);
                    font-weight: 700;
                }

                .contact-overlay-content .tagline {
                    font-size: 17px;
                    color: var(--secondary-color);
                    margin-top: -15px;
                    margin-bottom: 40px;
                    line-height: 1.5;
                }

                .contact-info-card {
                    background-color: #e6f7ff;
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    text-align: left;
                    height: 100px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                    width: 100%;
                    box-sizing: border-box;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .contact-info-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
                }

                .contact-info-card svg {
                    font-size: 28px;
                    color: var(--primary-color);
                    margin-right: 20px;
                }

                .contact-info-card .text-content h4 {
                    margin: 0;
                    font-size: 19px;
                    color: var(--text-color);
                    font-weight: 600;
                }

                .contact-info-card .text-content p {
                    margin: 0;
                    font-size: 16px;
                    color: var(--secondary-color);
                }

                /* Newsletter and Social Icons */
                .newsletter-section {
                    margin-top: 40px;
                    padding-top: 30px;
                    border-top: 1px solid var(--light-bg);
                    width: 100%;
                    box-sizing: border-box;
                }

                .newsletter-section h4 {
                    font-size: 20px;
                    color: var(--text-color);
                    margin-bottom: 20px;
                    font-weight: 600;
                }

                .newsletter-input-group {
                    display: flex;
                    margin-bottom: 25px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
                }

                .newsletter-input-group input[type="email"] {
                    flex-grow: 1;
                    padding: 12px 18px;
                    border: none;
                    outline: none;
                    font-size: 16px;
                    color: var(--text-color);
                }

                .newsletter-input-group button {
                    background-color: var(--primary-color);
                    color: var(--white);
                    border: none;
                    padding: 12px 20px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 600;
                    transition: background-color var(--transition-speed) ease;
                }

                .newsletter-input-group button:hover {
                    background-color: #0056b3;
                }

                .social-icons {
                    margin-top: 25px;
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                }

                .social-icons a {
                    color: var(--primary-color);
                    font-size: 26px;
                    transition: color var(--transition-speed) ease, transform var(--transition-speed) ease;
                }

                .social-icons a:hover {
                    color: #0056b3;
                    transform: translateY(-3px) scale(1.1);
                }
            `}</style>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <Link href="/" className="navbar-brand" legacyBehavior>
                    <a>SGH</a>
                </Link>
                <ul className="navbar-nav" id="desktopMenu">
                    {menuItems.map((item, index) => (
                        <li key={index} className={`nav-item ${item.dropdown ? 'has-dropdown' : ''}`}>
                            <Link href={item.link} passHref legacyBehavior>
                                <a className={`nav-link ${pathname === item.link || (item.dropdown && item.dropdown.some(subItem => pathname === subItem.link)) ? 'active' : ''}`}>
                                    {item.name}
                                    {item.dropdown && <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow-icon" />}
                                </a>
                            </Link>
                            {item.dropdown && (
                                <ul className="dropdown-menu">
                                    {item.dropdown.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link href={subItem.link} passHref legacyBehavior>
                                                <a className={pathname === subItem.link ? 'active' : ''}>{subItem.name}</a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="navbar-icons">
                    <FontAwesomeIcon icon={faBars} className="icon menu-icon" id="openSideMenu" onClick={toggleSideMenu} ref={openSideMenuRef} />
                    <FontAwesomeIcon icon={faBars} className="icon desktop-contact-icon" id="openContactOverlay" onClick={toggleContactOverlay} ref={openContactOverlayRef} />
                </div>
            </nav>

            <div id="mySideMenu" className={`side-menu ${isSideMenuOpen ? 'open' : ''}`} ref={sideMenuRef}>
                <a  className="closebtn" id="closeSideMenu" onClick={toggleSideMenu}>&times;</a>
                <ul className="side-menu-nav">
                    {menuItems.map((item, index) => (
                        <li key={index} className={`nav-item ${item.dropdown ? 'has-dropdown' : ''} ${activeDropdown === index ? 'active' : ''}`}>
                            <Link href={item.link} passHref legacyBehavior>
                                <a 
                                    className={`nav-link ${pathname === item.link || (item.dropdown && item.dropdown.some(subItem => pathname === subItem.link)) ? 'active' : ''}`} 
                                    onClick={handleSideMenuLinkClick} 
                                >
                                    {item.name}
                                    {item.dropdown && (
                                        <FontAwesomeIcon 
                                            icon={activeDropdown === index ? faMinus : faPlus} 
                                            className="dropdown-icon" 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                e.preventDefault(); 
                                                handleSideMenuDropdownClick(index);
                                            }} 
                                        />
                                    )}
                                </a>
                            </Link>
                            {item.dropdown && (
                                <ul className="side-menu-dropdown-menu">
                                    {item.dropdown.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link href={subItem.link} passHref legacyBehavior>
                                                <a onClick={handleSideMenuLinkClick} className={pathname === subItem.link ? 'active' : ''}>{subItem.name}</a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div id="contactOverlay" className={`contact-overlay ${isContactOverlayOpen ? 'active' : ''}`} ref={contactOverlayRef}>
                <a  className="closebtn" id="closeContactOverlay" onClick={toggleContactOverlay}>&times;</a>
                <div className="contact-overlay-content">
                    <div className="logo-section">
                        <FontAwesomeIcon icon={faShieldAlt} />
                        <h3>SGH</h3>
                    </div>
                    <p className="tagline">Your Partner in Health and Wellness</p>
                  
                    <div className="contact-info-card">
                        <FontAwesomeIcon icon={faPhoneAlt} />
                        <div className="text-content">
                            <h4>Phone</h4>
                            <p>123-456-7890</p>
                        </div>
                    </div>
                  
                    <div className="contact-info-card">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div className="text-content">
                            <h4>Email</h4>
                            <p>hellocallcenter@gmail.com</p>
                        </div>
                    </div>
                  
                    <div className="contact-info-card">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <div className="text-content">
                            <h4>Address</h4>
                            <p>123 Health Lane, Wellness City, HC 98765</p>
                        </div>
                    </div>

                    <div className="newsletter-section">
                        <h4>Subscribe to our Newsletter</h4>
                        <div className="newsletter-input-group">
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit">Submit</button>
                        </div>
                    </div>

                    <div className="social-icons">
                        <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="#" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    </div>
                </div>
            </div>
        </>
    );
}
  export default Header;