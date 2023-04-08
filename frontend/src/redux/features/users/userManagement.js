import { apiSlice } from "../../api/authApi";

export const userManagement = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeUserPass: builder.mutation({
      query: (body) => ({
        url: `/user/reset-pass-user/`,
        method: "PUT",
        body: {
          currentPass: body.currentPass,
          id: body["id"],
          newPass: body["newPass"],
        },
      }),
    }),
    changeUserMail: builder.mutation({
      query: (body) => ({
        url: `/user/reset-email-user?newEmail=${body.newEmail}&userID=${body.id}&oldEmail=${body.oldEmail}`,
        method: "PUT",
      }),
    }),
    changeUserAddress: builder.mutation({
      query: (body) => ({
        url: `/user/reset-address-user?newAddress=${body.newAddress}&userID=${body.id}`,
        method: "PUT",
      }),
    }),
    viewOrders: builder.mutation({
      query: (user_id) => ({
        url: `/get-All-CheckoutItems-byUserID/${user_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useChangeUserPassMutation,
  useChangeUserMailMutation,
  useChangeUserAddressMutation,
  useViewOrdersMutation,
} = userManagement;
