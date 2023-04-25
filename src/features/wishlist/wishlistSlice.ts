import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import Product from "../../interfaces/product";
import axios from "axios";

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const BASE_API_URL = process.env.REACT_APP_API_URL || "def";
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addItemToWishlist: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
  },
});

export const { setWishlist, addItemToWishlist } = wishlistSlice.actions;

export const addToWishlist =
  (product: Product, userId: number): AppThunk =>
  async (dispatch) => {
    console.log(product.id);
    console.log(userId);
    try {
      const response = await axios.post(`${BASE_API_URL}wishlist/add`, {
        user_id: userId,
        product_id: product.id,
      });

      if (response.status === 200) {
        dispatch(wishlistSlice.actions.addItemToWishlist(product));
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

export default wishlistSlice.reducer;
