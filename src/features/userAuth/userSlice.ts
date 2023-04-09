import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    address: "",
    role: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      console.log("User is now logged in");
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {
        id: "",
        name: "",
        email: "",
        address: "",
        role: "",
      };
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("User data set:", action.payload);
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      console.log("User data updated:", action.payload);
    },
  },
});

export const { login, logout, setUser, updateUser } = authSlice.actions;

export default authSlice.reducer;
