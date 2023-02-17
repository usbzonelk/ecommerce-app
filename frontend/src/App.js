import React from 'react'
import Login from './components/Login';
import SignUp from './components/SignUp'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext'
import Protected from './components/Protected'
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<Protected><HomePage /></Protected>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
