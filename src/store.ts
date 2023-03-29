// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Export RootState type
export default store;
