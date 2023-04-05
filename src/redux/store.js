import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/authApi";
import authReducer from "./features/authSlice";
import itemsReducer from "./features/products/productsSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    items: itemsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
