/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  shippingAddress: {},
  paymentMethod: "",
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addToCart: (state: any, data: any) => {
      const existProduct = state.cartItem.find(
        (item: any) => item.productId === data.payload.productId
      );
      if (existProduct) {
        state.cartItem = state.cartItem.map((item: any) =>
          item.productId === data.payload.productId ? data.payload : item
        );
      } else {
        state.cartItem = [...state.cartItem, data.payload];
      }
    },
  },
});

export default productSlice.reducer;

export const { addToCart } = productSlice.actions;
