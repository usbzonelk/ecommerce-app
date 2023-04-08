import { apiSlice } from "../../api/authApi";

export const adminManagement = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewItem: builder.mutation({
      query: (body) => ({
        url: `/admin/add-item/`,
        method: "PUT",
        body: body,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-item/${id}`,
        method: "DELETE",
      }),
    }),
    updateItemQty: builder.mutation({
      query: (body) => ({
        url: `/admin/update-item-qty/`,
        method: "PUT",
        body: {
          id: body.id,
          quantity: body.quantity,
        },
      }),
    }),
    changeAdminMail: builder.mutation({
      query: (body) => ({
        url: `/admin/reset-email-admin?newEmail=${body.newEmail}&adminID=${body.id}&oldEmail=${body.oldEmail}`,
        method: "PUT",
      }),
    }),
    changeAdminAddress: builder.mutation({
      query: (body) => ({
        url: `/admin/reset-address-admin?newAddress=${body.newAddress}&adminID=${body.id}`,
        method: "PUT",
      }),
    }),
    changeAdminPass: builder.mutation({
      query: (body) => ({
        url: `/admin/reset-pass-admin/`,
        method: "PUT",
        body: {
          currentPass: body.currentPass,
          id: body["id"],
          newPass: body["newPass"],
        },
      }),
    }),
    deleteUser: builder.mutation({
      query: (body) => ({
        url: `/admin/delete-user?userID=${body.user_id}&adminID=${body.adminID}`,
        method: "DELETE",
      }),
    }),
    getUserInfo: builder.mutation({
      query: (body) => ({
        url: `/admin/getUserID/${body.id}?adminID=${body.admin}&userID=${body.id}`,
        method: "GET",
      }),
    }),
    getAllCheckoutItems: builder.mutation({
      query: () => ({
        url: `/admin/get-All-CheckoutItems/`,
        method: "GET",
      }),
    }),
    addNewAdmin: builder.mutation({
      query: (body) => ({
        url: `/sign-up/signUp-admin/`,
        method: "PUT",
        body: body,
      }),
    }),

    verifyNewAdmin: builder.mutation({
      query: (otp, adminID) => ({
        url: `/sign-up/otp-verification-admin?OTP=${otp}&adminID=${adminID}`,
        method: "PUT",
      }),
    }),
    logoutAdmin: builder.mutation({
      query: () => ({
        url: `/logout/admin`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddNewAdminMutation,
  useAddNewItemMutation,
  useChangeAdminAddressMutation,
  useChangeAdminMailMutation,
  useChangeAdminPassMutation,
  useDeleteItemMutation,
  useDeleteUserMutation,
  useGetAllCheckoutItemsMutation,
  useGetUserInfoMutation,
  useUpdateItemQtyMutation,
  useVerifyNewAdminMutation,
  useLogoutAdminMutation,
} = adminManagement;
