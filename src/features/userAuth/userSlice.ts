// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isLoggedIn: false,
//   user: null,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state) => {
//       state.isLoggedIn = true;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
// });

// export const { login, logout, setUser } = authSlice.actions;

// export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isLoggedIn: false,
//   user: {
//     name: "",
//     email: "",
//     address: "",
//   },
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state) => {
//       state.isLoggedIn = true;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.user = {
//         name: "",
//         email: "",
//         address: "",
//       };
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
// });

// export const { login, logout, setUser } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    address: "",
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
      };
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("User data set:", action.payload);
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
