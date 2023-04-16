import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../../interfaces/product";

interface CartState {
  items: Product[];
  isOpen: boolean;
  totalAmountReducer: number;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalAmountReducer: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity ?? 0) + quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id || item.size !== action.payload.size
      );
    },

    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    emptyCart: (state) => {
      state.items = [];
    },
    setTotalAmountReducer: (state, action: PayloadAction<number>) => {
      state.totalAmountReducer = action.payload;
    },
  },
});

export const {
  addToCart,
  openCart,
  removeFromCart,
  closeCart,
  emptyCart,
  setTotalAmountReducer,
} = cartSlice.actions;

export default cartSlice.reducer;
