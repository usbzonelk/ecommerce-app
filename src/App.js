import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/Context";
import Protected from "./components/Protected";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import UserDashboard from "./pages/UserDashboard";
import store from "./redux/store";
import { Provider } from "react-redux";
import RequireAuth from "./redux/auth/RequireAuth";
import Cart from "./components/User/Cart";

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route
            path="/login"
            element={
              <Provider store={store}>
                <Login />{" "}
              </Provider>
            }
          />

          <Route
            path="/admin-login"
            element={
              <Provider store={store}>
                <Login />{" "}
              </Provider>
            }
          />
          <Route path="/signup" element={<SignUp />} />

          <Route
            element={
              <Provider store={store}>
                <RequireAuth />{" "}
              </Provider>
            }
          >
            {/*             <Route path="/shop" element={<Shop />} />
             */}{" "}
            <Route
              path="/cart"
              element={
                <Provider store={store}>
                  <Cart />{" "}
                </Provider>
              }
            />
          </Route>

          <Route path="/shop" element={<Shop />} />
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
