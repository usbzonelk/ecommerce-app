import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user_type: sessionStorage.getItem("type") || Cookies.get("type") || null,
    user: null,
    access: sessionStorage.getItem("token") || Cookies.get("token") || null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user_name, access } = action.payload;
      state.user = user_name;
      state.access = access;
    },
    logOut: (state, action) => {
      state.user = null;
      state.access = null;
      state.user_type = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentAccessToken = (state) => state.auth.access;
