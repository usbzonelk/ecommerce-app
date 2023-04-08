import { apiSlice } from "../../api/publicApi";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login/user-login/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout/user/",
        method: "DELETE",
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/sign-up/signUp-user/",
        method: "PUT",
        body: body,
      }),
    }),
    verify: builder.mutation({
      query: (otp, uID) => ({
        url: `/sign-up/otp-verification-user?OTP=${otp}&userID=${uID}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useVerifyMutation,
} = authApiSlice;
