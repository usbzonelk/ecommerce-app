import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut as logoutSessions } from "../redux/features/authSlice";
import { useLogoutAdminMutation } from "../redux/features/users/adminManagement";
import { useLogoutMutation } from "../redux/features/users/loginUser";
import { Spin } from "antd";

import Cookies from "js-cookie";
const Logout = () => {
  const currentLocation = useLocation().pathname;
  const userType = useSelector((state) => state.auth.user_type);
  const dispatch = useDispatch();

  const allLogOutMutations = {
    user: useLogoutMutation,
    admin: useLogoutAdminMutation,
  };

  const logMeOut = allLogOutMutations[userType] || null;

  const [logout, { isLoading }] = logMeOut();

  const handleLogout = () => {
    if (logMeOut) {
      logout();
      dispatch(logoutSessions());
    }
  };
  useEffect(() => {
    localStorage.removeItem("type");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("type");
    handleLogout();
    window.location.href = "/";
  });

  return (
    <div>
      {" "}
      <Spin size="large" />
    </div>
  );
};

export default Logout;
