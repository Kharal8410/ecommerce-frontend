import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  shippingAddress: {},
  paymentMethod: "",
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
});

export default productSlice.reducer;

// eslint-disable-next-line no-empty-pattern
export const {} = productSlice.actions;
