import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://pub.uapik.app/api/v1/",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
