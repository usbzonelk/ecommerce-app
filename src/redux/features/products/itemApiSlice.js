import { apiSlice } from "../../api/publicApi";

export const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.mutation({
      query: () => ({
        url: "/item/get-allItems/",
        method: "GET",
      }),
    }),
    getAllBrands: builder.mutation({
      query: () => ({
        url: "/item/get-brands/",
        method: "GET",
      }),
    }),
    getItem: builder.mutation({
      query: (id) => ({
        url: "/item/get-item-byID/?itemID=" + id,
        method: "GET",
      }),
      onSuccess: (data) => {
        console.log("getItem mutation successful with data:", data);
      },
      onError: (error) => {
        console.log("getItem mutation error:", error);
      },
    }),
    getItemsOnPrice: builder.mutation({
      query: (data) => ({
        url:
          "/item/get-items-pricerange/?lowerPriceBound=" +
          data[0] +
          "&upperPriceBound=" +
          data[1],
        method: "GET",
      }),
    }),
    getItemsOnSearch: builder.mutation({
      query: (searchData) => ({
        url: "/item/search/?searchString=" + searchData,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllItemsMutation,
  useGetAllBrandsMutation,
  useGetItemMutation,
  useGetItemsOnPriceMutation,
  useGetItemsOnSearchMutation,
} = itemApiSlice;
