import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { IoCallOutline, IoMailOutline, IoLocationOutline } from 'react-icons/io5';
import BrandLogoHp from '../images/brand-logo-hp.png';

const Footer = () => {
    return (
        <footer>
            <div class="footer-brands">
                <div class="container">
                    <h5 class="footer-brands-title">Our Brands</h5>

                    <div class="footer-brands-box">
                        <div className="brand-logo">
                            <img src={BrandLogoHp} alt='hp logo' />
                        </div>

                        <div className="brand-logo">
                            <img src={BrandLogoHp} alt='hp logo' />
                        </div>

                        <div className="brand-logo">
                            <img src={BrandLogoHp} alt='hp logo' />
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-nav">
                <div class="container">
                    <ul class="footer-nav-list">
                        <li class="nav-item">
                            <h5 class="nav-title">Quick Links</h5>
                        </li>

                        <li class="nav-item">
                            <a href="#" class="nav-link">Laptops</a>
                        </li>

                        <li class="nav-item">
                            <a href="#" class="nav-link">Softwares</a>
                        </li>

                        <li class="nav-item">
                            <a href="#" class="nav-link">Monitors</a>
                        </li>

                        <li class="nav-item">
                            <a href="#" class="nav-link">Gadgets</a>
                        </li>
                    </ul>

                    <ul class="footer-nav-list">
                        <li class="nav-item-contact">
                            <h5 class="nav-title">Contact</h5>
                        </li>

                        <li class="nav-item-contact">
                            <a href="#" class="contact-icon">
                                <IoLocationOutline />
                            </a>

                            <address class="content">
                                123 main Road,
                                Colombo, 10000, Srilanka
                            </address>
                        </li>

                        <li class="nav-item-contact">
                            <a href="#" class="contact-icon">
                                <IoCallOutline />
                            </a>

                            <a href="tel:+941234567890" class="nav-link">(94) 123-4567-890</a>
                        </li>

                        <li class="nav-item-contact">
                            <a href="#" class="contact-icon">
                                <IoMailOutline />
                            </a>

                            <a href="mailto:store@laptopstore.com" class="nav-link">store@laptopstore.com</a>
                        </li>
                    </ul>

                    <ul class="footer-nav-list">
                        <li class="nav-item">
                            <h5 class="nav-title">Follow Us</h5>
                        </li>

                        <li>
                            <ul class="social-link">
                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        <FaFacebook size={45} />
                                    </a>
                                </li>

                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        <FaTwitter size={45} />
                                    </a>
                                </li>

                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        <FaLinkedinIn size={45} />
                                    </a>
                                </li>

                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        <FaInstagram size={45} />
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="container">
                    <p>
                        Copyright &copy; <a href="#">Anon</a> all rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
