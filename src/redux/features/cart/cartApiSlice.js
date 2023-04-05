import { apiSlice } from "../../api/authApi";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.mutation({
      query: (id) => ({
        url: `/user/get-All-Cart-Items/${id}}`,
        method: "GET",
      }),
    }),
    addItemToCart: builder.mutation({
      query: (item) => ({
        url: "/user/add-cart-customer",
        method: "POST",
        body: item,
      }),
    }),
    deleteItem: builder.mutation({
      query: (order_id, user_id) => ({
        url: `/user/delete-order-byId?orderID=${order_id}&userID=${user_id}`,
        method: "DELETE",
        body: body,
      }),
    }),
    deleteAllItems: builder.mutation({
      query: (user_id) => ({
        url: `/user/delete-allOrders-byId/${user_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCartItemsMutation,
  useAddItemToCartMutation,
  useDeleteAllItemsMutation,
  useDeleteItemMutation,
} = cartApiSlice;
