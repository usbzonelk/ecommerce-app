import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken } from "../features/authSlice";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

console.log("authFX",Cookies.get("token"));
const RequireAuth = () => {
  const token = useSelector(selectCurrentAccessToken);
  const location = useLocation();

  console.log("token:", token);
  console.log("location:", location);

  const validateToken = () => {
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const isAuthenticated = token && validateToken();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
