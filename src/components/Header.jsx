import React, { useState } from "react";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaSearch,
    FaWindows,
} from "react-icons/fa";
import {
    IoPersonOutline,
    IoHeartOutline,
    IoBagHandleOutline,
    IoMenu,
    IoClose,
} from "react-icons/io5";
import BrandLogo from "../images/brand-logo.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const [searchValue, setSearchValue] = useState("");
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const cartItems = useSelector((state) => state.cart.cart);
    const location = useLocation();
    const showSearch = location.pathname !== "/shop";

    const handleMobileMenuView = () => {
        setShowMobileMenu(!showMobileMenu);
    }

    const handleSearch = () => {
        window.location.href = `/shop?search=${searchValue}`;
    };

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

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
                            <Link to="/dashboard" className="user-action">
                                <IoPersonOutline />
                            </Link>
                        </button>

                        <Link to="/cart">
                            <button className="action-btn">
                                <IoBagHandleOutline />
                                <span className="count">{cartItems.length}</span>
                            </button>
                        </Link>
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
                                    <Link to="/">
                                        <a className="menu-title">Home</a>
                                    </Link>
                                </li>

                                <li className="menu-category">
                                    <Link to="/shop">
                                        <a className="menu-title">Shop</a>
                                    </Link>
                                </li>

                                <li className="menu-category">
                                    <Link to="/contact">
                                        <a className="menu-title">Contact</a>
                                    </Link>
                                </li>

                                <li className="menu-category">
                                    <Link to="/aboutus">
                                        <a className="menu-title">About Us</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className="menu-icon">
                        <button className={showMobileMenu ? "hidden" : "nav-view"}
                            onClick={handleMobileMenuView}>
                            <IoMenu size={30} />
                        </button>

                        <button className={showMobileMenu ? "close-view" : "hidden"}
                            onClick={handleMobileMenuView}>
                            <IoClose size={30} />
                        </button>
                    </div>

                    <div className={showMobileMenu ? "menu-view" : "hidden"}>
                        <div className="container">
                            <nav>
                                <ul className='mobile-menu-nav-list'>
                                    <Link to="/">
                                        <li className="mobile-menu-nav-list-text">Home</li>
                                    </Link>

                                    <Link to="/shop">
                                        <li className="mobile-menu-nav-list-text">Shop</li>
                                    </Link>

                                    <Link to="/contact">
                                        <li className="mobile-menu-nav-list-text">Contact</li>
                                    </Link>

                                    <Link to="/aboutus">
                                        <li className="mobile-menu-nav-list-text">About Us</li>
                                    </Link>
                                </ul>
                            </nav>

                            <div className="mobile-menu-search-container">
                                {showSearch && (
                                    <>
                                        <input
                                            type="search"
                                            name="search"
                                            className="search-field"
                                            placeholder="Search"
                                            value={searchValue}
                                            onChange={handleInputChange}
                                            onKeyDown={(event) => {
                                                if (event.keyCode === 13) {
                                                    handleSearch();
                                                }
                                            }}
                                        />
                                        <button className="search-btn" onClick={handleSearch}>
                                            <FaSearch />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="search-container">
                        {showSearch && (
                            <>
                                <input
                                    type="search"
                                    name="search"
                                    className="search-field"
                                    placeholder="Search"
                                    value={searchValue}
                                    onChange={handleInputChange}
                                    onKeyDown={(event) => {
                                        if (event.keyCode === 13) {
                                            handleSearch();
                                        }
                                    }}
                                />
                                <button className="search-btn" onClick={handleSearch}>
                                    <FaSearch />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;