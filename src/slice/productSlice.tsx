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
    removeFromCart: (state: any, data: any) => {
      state.cartItem = state.cartItem.filter((cart: any) => {
        return cart.productId !== data.payload;
      });
    },
    setShippingAddress: (state: any, data: any) => {
      state.shippingAddress = data.payload;
    },
  },
});

export default productSlice.reducer;

export const { addToCart, removeFromCart, setShippingAddress } =
  productSlice.actions;
