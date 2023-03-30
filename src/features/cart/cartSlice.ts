// // src/features/cart/cartSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Product from "../../interfaces/product";

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<Product>) => {
//       const product = action.payload;
//       const existingItem = state.items.find((item) => item.id === product.id);

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...product, quantity: 1 });
//       }
//     },
//   },
// });

// export const { addToCart } = cartSlice.actions;

// export default cartSlice.reducer;

// export interface CartState {
//   items: CartItem[];
//   isOpen: boolean; // add isOpen property
// }

// const initialState: CartState = {
//   items: [],
//   isOpen: false, // set isOpen to false by default
// };

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../../interfaces/product";

interface CartState {
  items: Product[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity ?? 0) + 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const { addToCart, openCart, closeCart } = cartSlice.actions;

export default cartSlice.reducer;
