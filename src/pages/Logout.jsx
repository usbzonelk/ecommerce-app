import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useLogoutAdminMutation } from "../redux/features/users/adminManagement";
import { useLogoutMutation } from "../redux/features/users/loginUser";

import Cookies from "js-cookie";
const Logout = () => {
  const currentLocation = useLocation().pathname;
  const userType = useSelector((state) => state.auth.user_type);

  const allLogOutMutations = {
    user: useLogoutMutation,
    admin: useLogoutAdminMutation,
  };

  const logMeOut = allLogOutMutations[userType] || null;

  const [logout, { isLoading }] = logMeOut();

  const handleLogout = async () => {
    if (logMeOut) {
      await logout();
    }
  };
  useEffect(() => {
    localStorage.removeItem("type");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("type");
    logout();
    window.location.href = "/";
  });

  return <div></div>;
};

export default Logout;
