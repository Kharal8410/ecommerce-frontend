import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
};

const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    createOrder: (state, data) => {
      state.order = data.payload;
    },
    resetOrder: (state) => {
      state.order = {};
    },
  },
});

export default orderSlice.reducer;

export const { createOrder, resetOrder } = orderSlice.actions;
