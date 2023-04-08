import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";

import { useLoginMutation } from "../redux/features/users/loginUser";
import { useAdminLoginMutation } from "../redux/features/users/loginAdmin";

import Cookies from "js-cookie";

const Login = () => {
  const nav = useNavigate();
  const currentLocation = useLocation().pathname;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [validEmail, setValidEmail] = useState(false);

  const allLoginMutations = {
    "/login": useLoginMutation,
    "/admin-login": useAdminLoginMutation,
  };

  const logMeIn = allLoginMutations[currentLocation] || null;

  const [login, { data, isLoading }] = useLoginMutation();

  const handleEmailChange = (event) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (pattern.test(event.target.value)) {
      setEmail(event.target.value);
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validEmail) {
      message.destroy();
      message.error("Invalid Email!");
      return;
    }
    let tokenData = "";
    try {
      const { data } = await login({
        email: email,
        password: password,
      }).unwrap();
      tokenData = data;
      console.log("tokenData", tokenData);
      tokenData = tokenData.split("token")[1];
      console.log("tt", tokenData);

      const allUserTypeMaps = {
        "/login": "user",
        "/admin-login": "admin",
      };

      const userType = allUserTypeMaps[currentLocation] || null;

      if (rememberMe) {
        Cookies.set("token", tokenData, { expires: 7 });
        Cookies.set("type", userType, { expires: 7 });
        localStorage.removeItem("type");
        localStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", tokenData);
        sessionStorage.setItem("type", userType);
        Cookies.remove("token");
        Cookies.remove("type");
      }
      nav("/");
    } catch (err) {
      console.log(err);
      if (!err?.originalStatus) {
        message.error("Could not connect to server");
      } else if (err.originalStatus === 400) {
        message.error("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        message.error("Unauthorized");
      } else {
        message.error("Login Failed");
      }
    }
  };

  return (
    <div className="login vh-100 container py-5 h-100">
      <div className="row d-flex align-items-center justify-content-center h-100">
        <div className="col-md-8 col-lg-7 col-xl-6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone"
          />
        </div>

        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <p className="h2 bold mb-5 mx-md-1">
            {currentLocation === "/login" ? "Login" : "Admin Login"}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <input
                required
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Enter your email"
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-outline mb-4">
              <input
                required
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Enter password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="d-flex justify-content-around align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                  id="form1Example3"
                />
                <label htmlFor="Remember me!">Remember Me</label>
              </div>
              <a href="#!" className="forgot-password-btn">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="btn-login">
              {isLoading ? (
                <LoadingOutlined
                  style={{ fontSize: 24, color: "white" }}
                  spin
                />
              ) : (
                "Sign in"
              )}
            </button>
            <hr />

            {currentLocation === "/login" ? (
              <p>
                Don't You Have An Account?{" "}
                <Link to="/signup">Create an account</Link>
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
