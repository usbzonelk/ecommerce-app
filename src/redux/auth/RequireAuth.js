import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentAccessToken,
  setCurrentUser,
} from "../features/authSlice";
import jwt_decode from "jwt-decode";

import { useGetCartItemsMutation } from "../features/cart/cartApiSlice";

const RequireAuth = () => {
  const token = useSelector(selectCurrentAccessToken);
  const location = useLocation();

  const dispatch = useDispatch();

  console.log("token:", token);
  console.log("location:", location);

  const validateToken = () => {
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        return false;
      }
      const userID = decodedToken.id;
      /*       dispatch(setCurrentUser(userID));
       */
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const isAuthenticated = token && validateToken();

  return isAuthenticated ? (
    <Outlet />
  ) : location.pathname === "/admin" ? (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
