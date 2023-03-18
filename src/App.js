import React from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/Context';
import Protected from './components/Protected';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Shop from './components/Shop'
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Header/>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/' element={<HomePage />} />
        </Routes>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
