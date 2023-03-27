import React from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Shop from './components/Shop'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/Context';
import Protected from './components/Protected';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Header/>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/' element={<Protected><HomePage /></Protected>} />
        </Routes>

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
