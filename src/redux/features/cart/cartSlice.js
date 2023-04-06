import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetCartItemsMutation } from "./cartApiSlice";

const initialState = {
  cart: [
    {
      itemID: 28,
      unitPrice: 45900,
      disPrecentage: 5.2,
      qty: 5,
    },
    {
      itemID: 27,
      unitPrice: 75900,
      disPrecentage: 8.2,
      qty: 69,
    },
    {
      itemID: 26,
      unitPrice: 100000,
      disPrecentage: 10.2,
      qty: 88,
    },
  ],
  selectedCartItem: null,
  isLoadingCart: false,
  error: null,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { getState }) => {
    console.log("cartslice16");
    const userId = getState().auth.user;
    const token = getState().auth.access;
    const response = await fetch(
      `http://springBooty.lk/api/v1/user/get-All-Cart-Items/${userId}`,
      { headers: { Authorization: token } }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(response);
        return data.data;
      });
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSelectedCartItem(state, action) {
      state.selectedCartItem = action.payload;
    },
    setIsLoadingCart(state, action) {
      state.isLoadingCart = action.payload;
    },
    deleteCartItem(state, action) {
      const itemIdToDelete = action.payload;
      state.cart = state.cart.filter((item) => item.id !== itemIdToDelete);
    },
    addToCart(state, action) {
      const newItem = action.payload;
      state.cart.push(newItem);
    },
    deleteCart(state, action) {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.pending, (state) => {
      console.log("fetchCartItems.pending");
      state.isLoadingCart = true;
      state.error = null;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.isLoadingCart = false;
      state.error = null;
      state.cart = action.payload.data;
      console.log("fetchCartItems.fulfilled");
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.isLoadingCart = false;
      state.error = action.error.message;
      console.log("fetchCartItems.rejected");
    });
  },
});

export const {
  setSelectedCartItem,
  setIsLoadingCart,
  deleteCartItem,
  addToCart,
  deleteCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCurrentCart = (state) => state.cart.cart;

export const fetchCart = fetchCartItems;
