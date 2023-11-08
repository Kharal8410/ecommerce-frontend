import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  jwt: "",
  role: "",
  email: "",
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, data) => {
      state.isLoggedIn = true;
      state.jwt = data.payload.jwt;
      state.role = data.payload.role;
      state.email = data.payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.jwt = "";
      state.role = "";
      state.email = "";
      localStorage.removeItem("persist:root");
    },
  },
});

export default authSlice.reducer;

export const { login } = authSlice.actions;