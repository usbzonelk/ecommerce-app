import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/Context";
import Protected from "./components/Protected";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Shop from "./components/Shop";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import UserDashboard from "./pages/UserDashboard";
import { store } from "./redux/store";

import { Provider } from "react-redux";

import RequireAuth from "./redux/auth/RequireAuth";

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            element={
              <Provider store={store}>
                <RequireAuth />{" "}
              </Provider>
            }
          >
            <Route path="/shop" element={<Shop />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <UserDashboard />
              </Protected>
            }
          />
          <Route path="/" element={<HomePage />} />
        </Routes>

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
