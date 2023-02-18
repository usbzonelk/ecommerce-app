import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import {IoPersonOutline, IoHeartOutline, IoBagHandleOutline} from 'react-icons/io5';
const HomePage = () => {

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
                <IoPersonOutline/>
              </button>

              <button class="action-btn">
                <IoHeartOutline/>
                <span class="count">0</span>
              </button>

              <button class="action-btn">
                <IoBagHandleOutline/>
                <span class="count">0</span>
              </button>

            </div>

          </div>
        </div>
      </header>
    </div>
  );
}

export default HomePage;