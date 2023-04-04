// userSlice.ts

import {
  createSlice,
  Dispatch,
  ThunkAction,
  AnyAction,
} from "@reduxjs/toolkit";

import { RootState } from "../../store";

import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  },
  reducers: {
    userLoading: (state) => {
      state.isLoading = true;
    },
    userLoaded: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    authError: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { userLoading, userLoaded, authError } = userSlice.actions;

export const loadUser =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    try {
      dispatch(userLoading());

      const token = getState().user.token;

      if (!token) {
        return dispatch(authError());
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get("/users/current", config);

      return dispatch(userLoaded(res.data));
    } catch (error) {
      console.error(error);
      return dispatch(authError());
    }
  };

export default userSlice.reducer;
