import { apiSlice } from "../../api/publicApi";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/login/admin-login/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useAdminLoginMutation } = authApiSlice;
