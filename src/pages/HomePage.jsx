import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn, FaSearch } from 'react-icons/fa';
import { IoPersonOutline, IoHeartOutline, IoBagHandleOutline, IoMenu } from 'react-icons/io5';
import HomePageMain from '../components/HomePageMain';
import Footer from '../components/Footer';
import BrandLogo from '../images/brand-logo.png';
import Shop from '../components/Shop';
import Contact from '../components/Contact';
import AboutUs from '../components/AboutUs';

const HomePage = () => {
  const [navBarClickedPage, setNavBarClickedPage] = useState("Home");

  return (
    <div className="home-page">
      <header>
        <div className="header-top">
          <div className="container">
            <ul class="header-social-container">
              <li>
                <a href="#" class="social-link">
                  <FaFacebook />
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                  <FaTwitter />
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                  <FaInstagram />
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>

            <div class="header-alert-news">
              <p>
                <b>Latest </b>
                Laptop Models Now Available!
              </p>
            </div>

            <div class="header-user-actions">
              <button class="action-btn">
                <IoPersonOutline />
              </button>

              <button class="action-btn">
                <IoHeartOutline />
                <span class="count">0</span>
              </button>

              <button class="action-btn">
                <IoBagHandleOutline />
                <span class="count">0</span>
              </button>
            </div>
          </div>
        </div>

        <div className="header-main">
          <div className="container">
            <a href="#" class="header-logo">
              <img src={BrandLogo} alt="Anon's logo" width="180" height="80" />
            </a>

            <nav class="nav-menu">
              <div class="container">
                <ul class="menu-category-list">
                  <li class="menu-category">
                    <a
                      class="menu-title"
                      onClick={() => setNavBarClickedPage("Home")}
                    >
                      Home
                    </a>
                  </li>

                  <li class="menu-category">
                    <a
                      class="menu-title"
                      onClick={() => setNavBarClickedPage("Shop")}
                    >
                      Shop
                    </a>
                  </li>

                  <li class="menu-category">
                    <a
                      class="menu-title"
                      onClick={() => setNavBarClickedPage("Contact")}
                    >
                      Contact
                    </a>
                  </li>

                  <li class="menu-category">
                    <a
                      class="menu-title"
                      onClick={() => setNavBarClickedPage("AboutUs")}
                    >
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="menu-icon">
              <IoMenu />
            </div>

            <div class="search-container">
              <input
                type="search"
                name="search"
                class="search-field"
                placeholder="Search"
              />
              <button class="search-btn">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </header>

      {navBarClickedPage === "Home" ? (
        <HomePageMain />
      ) : navBarClickedPage === "Shop" ? (
        <Shop />
      ) : navBarClickedPage === "Contact" ? (
        <Contact />
      ) : navBarClickedPage === "AboutUs" ? (
        <AboutUs />
      ) : null}

      <ChangeSettings />

      <Footer />
    </div >
  );
}

export default HomePage;