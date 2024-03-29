import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { IoCallOutline, IoMailOutline, IoLocationOutline } from 'react-icons/io5';
import BrandLogoHp from '../images/brand-logo-hp.png';
import BrandLogoAcer from '../images/brand-logo-acer.png';
import BrandLogoDell from '../images/brand-logo-dell.png';

const Footer = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    return (
        <footer>
            <div className="footer-brands">
                <div className="container">
                    <h5 className="footer-brands-title">Our Brands</h5>

                    <div className="footer-brands-box">
                        <div className="brand-logo">
                            <img src={BrandLogoHp} alt='hp logo' />
                        </div>

                        <div className="brand-logo">
                            <img src={BrandLogoAcer} alt='hp logo' />
                        </div>

                        <div className="brand-logo">
                            <img src={BrandLogoDell} alt='hp logo' />
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-nav">
                <div className="container">
                    <ul className="footer-nav-list">
                        <li className="nav-item">
                            <h5 className="nav-title">Quick Links</h5>
                        </li>

                        <li className="nav-item">
                            <Link to="/" onClick={() => {
                                window.scroll({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth",
                                });
                            }} className="nav-link">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/shop" onClick={() => {
                                window.scroll({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth",
                                });
                            }} className="nav-link">Shop</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/contact" onClick={() => {
                                window.scroll({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth",
                                });
                            }} className="nav-link">Contact Us</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/aboutus" onClick={() => {
                                window.scroll({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth",
                                });
                            }} className="nav-link">About Us</Link>
                        </li>
                    </ul>

                    <ul className="footer-nav-list">
                        <li className="nav-item-contact">
                            <h5 className="nav-title">Contact</h5>
                        </li>

                        <li className="nav-item-contact">
                            <a href="#" className="contact-icon">
                                <IoLocationOutline />
                            </a>

                            <address className="content">
                                123 main Road,
                                Colombo, 10000, Srilanka
                            </address>
                        </li>

                        <li className="nav-item-contact">
                            <a href="#" className="contact-icon">
                                <IoCallOutline />
                            </a>

                            <a href="tel:+941234567890" className="nav-link">(94) 123-4567-890</a>
                        </li>

                        <li className="nav-item-contact">
                            <a href="#" className="contact-icon">
                                <IoMailOutline />
                            </a>

                            <a href="mailto:store@laptopstore.com" className="nav-link">store@laptopstore.com</a>
                        </li>
                    </ul>

                    <ul className="footer-nav-list">
                        <li className="nav-item">
                            <h5 className="nav-title">Follow Us</h5>
                        </li>

                        <li>
                            <ul className="social-link">
                                <li className="nav-item">
                                    <a href="https://facebook.com" target="_blank" className="nav-link">
                                        <FaFacebook size={45} />
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="https://twitter.com" target="_blank" className="nav-link">
                                        <FaTwitter size={45} />
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="https://linkedin.com" target="_blank" className="nav-link">
                                        <FaLinkedinIn size={45} />
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="https://instagram.com" target="_blank" className="nav-link">
                                        <FaInstagram size={45} />
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>
                        Copyright &copy; <a href="#">Orrex</a> all rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
