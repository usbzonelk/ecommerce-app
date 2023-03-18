import React, { useState } from 'react';
import Header from '../components/Header';
import HomePageMain from '../components/HomePageMain';
import Footer from '../components/Footer';
import Shop from '../components/Shop';
import Contact from '../components/Contact';
import AboutUs from '../components/AboutUs';

const HomePage = () => {
  const [navBarClickedPage, setNavBarClickedPage] = useState('Home');

  return (
    <div className="home-page">
      <Header/>
      <Footer />
    </div >
  );
}

export default HomePage;