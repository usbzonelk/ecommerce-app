import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://uapik.app/app/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access;
    console.log(token);
    if (token) {
      headers.set("Authorization", `JWT ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
