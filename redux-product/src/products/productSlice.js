import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  cart: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    viewProduct: (state, action) => {
      state.product += action.payload;
    },
  },
});

export const { viewProduct } = productSlice.actions;

export default productSlice.reducer;
