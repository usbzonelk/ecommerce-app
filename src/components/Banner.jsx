import React from 'react';
import BannerImg from '../images/banner-img.png';

const Banner = () => {
    return (
        <div className="banner">
            <div className="container">
                <div className="banner-content">
                    <h2 className="banner-title">Your One-Stop <br/>Shop for Laptops</h2>
                    <p className="banner-text">
                    Welcome to our laptop store e-commerce web app! 
                    Here, you'll find a wide range of laptops to suit 
                    all your computing needs. Whether you're a student, 
                    professional, gamer, or simply looking for a reliable 
                    machine for everyday use, we've got you covered
                    </p>
                    <a href="#" className="banner-btn">Shop Now</a>
                </div>

                <img src={BannerImg} alt="Banner image" className="banner-img" />
            </div>
        </div>
    )
}

export default Banner
