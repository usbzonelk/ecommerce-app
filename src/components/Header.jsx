import React, {useState} from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn, FaSearch } from 'react-icons/fa';
import { IoPersonOutline, IoHeartOutline, IoBagHandleOutline, IoMenu } from 'react-icons/io5';
import BrandLogo from '../images/brand-logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const showMenu = () => {
        setShowMobileMenu(!showMobileMenu);    
    }

    return (
        <header>
            <div className="header-top">
                <div className="container">
                    <ul className="header-social-container">
                        <li>
                            <a href="#" className="social-link">
                                <FaFacebook />
                            </a>
                        </li>

                        <li>
                            <a href="#" className="social-link">
                                <FaTwitter />
                            </a>
                        </li>

                        <li>
                            <a href="#" className="social-link">
                                <FaInstagram />
                            </a>
                        </li>

                        <li>
                            <a href="#" className="social-link">
                                <FaLinkedinIn />
                            </a>
                        </li>
                    </ul>

                    <div className="header-alert-news">
                        <p>
                            <b>Latest </b>
                            Laptop Models Now Available!
                        </p>
                    </div>

                    <div className="header-user-actions">
                        <button className="action-btn">
                            <Link to="/dashboard" className='user-action'><IoPersonOutline /></Link>
                        </button>

                        <button className="action-btn">
                            <IoHeartOutline />
                            <span className="count">0</span>
                        </button>

                        <button className="action-btn">
                            <IoBagHandleOutline />
                            <span className="count">0</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="header-main">
                <div className="container">
                    <a href="#" className="header-logo">
                        <img src={BrandLogo} alt="Anon's logo" width="180" height="80" />
                    </a>

                    <nav className="nav-menu">
                        <div className="container">
                            <ul className="menu-category-list">
                                <li className="menu-category">
                                    <Link to="/"><a className="menu-title">Home</a></Link>
                                </li>

                                <li className="menu-category">
                                <Link to="/shop"><a className="menu-title">Shop</a></Link>
                                </li>

                                <li className="menu-category">
                                <Link to="/contact"><a className="menu-title">Contact</a></Link>
                                </li>

                                <li className="menu-category">
                                <Link to="/aboutus"><a className="menu-title">About Us</a></Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className='menu-icon'>
                        <button onClick={showMenu}><IoMenu /></button>
                    </div>

                    <div className={showMobileMenu?"menu-view":"menu-hidden"}>
                        <div className="container">
                            <nav>
                                <ul>
                                    <li>Home</li>
                                    <li>Shop</li>
                                    <li>Contact</li>
                                    <li>About Us</li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="search-container">
                        <input type="search" name="search" className="search-field" placeholder="Search" />
                        <button className="search-btn">
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </div >
        </header >
    )
}

export default Header
