import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedItem: null,
  isLoadingItms: false,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
    setIsLoadingItems(state, action) {
      state.isLoadingItms = action.payload;
    },
  },
});

export const { setItems, setSelectedItem, setIsLoadingItems } =
  itemsSlice.actions;

export default itemsSlice.reducer;
