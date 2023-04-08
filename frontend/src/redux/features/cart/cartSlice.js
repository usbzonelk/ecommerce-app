import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetCartItemsMutation } from "./cartApiSlice";

const initialState = {
  cart: [],
  selectedCartItem: null,
  isLoadingCart: false,
  error: null,
  subtotal: 0,
  savings: 0,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { getState }) => {
    console.log("cartslice16");
    const userId = getState().auth.user;
    const token = getState().auth.access;
    const response = await fetch(
      `http://localhost:8085/api/v1/user/get-All-Cart-Items/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(response);
        return data.data;
      });
  }
);

export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems",
  async (itemId, { getState, dispatch }) => {
    try {
      const userId = getState().auth.user;
      const token = getState().auth.access;
      const response = await fetch(
        `http://localhost:8085/api/v1/user/delete-order-byId?orderID=${itemId}&userID=${userId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) {
        throw new Error("Failed to delete cart item");
      }
      dispatch(deleteCartItem(itemId));
    } catch (error) {
      alert("failed to delete", error);
    }
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
    calculateSubtotal: (state) => {
      const total = state.cart.reduce((acc, item) => {
        return acc + item.unitPrice * item.qty;
      }, 0);
      state.subtotal = total;
    },
    calculateSavings: (state) => {
      const total = state.cart.reduce((acc, item) => {
        const discountAmount = (item.unitPrice * item.disPrecentage) / 100;
        const itemSavings = discountAmount * item.qty;
        return acc + itemSavings;
      }, 0);
      state.savings = total;
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
    builder.addCase(deleteCartItems.pending, (state) => {
      state.isLoadingCart = true;
      state.error = null;
    });
    builder.addCase(deleteCartItems.fulfilled, (state) => {
      state.isLoadingCart = false;
      state.error = null;
    });
    builder.addCase(deleteCartItems.rejected, (state, action) => {
      state.isLoadingCart = false;
      state.error = action.error.message;
    });
  },
});

export const {
  setSelectedCartItem,
  setIsLoadingCart,
  deleteCartItem,
  addToCart,
  deleteCart,
  calculateSavings,
  calculateSubtotal,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCurrentCart = (state) => state.cart.cart;

export const fetchCart = fetchCartItems;
