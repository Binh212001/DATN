import { createSlice } from "@reduxjs/toolkit";
import { getCartById, addItemToCart, updateCartItem } from "./cartAction";

const initialState = {
  cartItems: [],
  errorMessage: "",
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get cart items
    builder.addCase(getCartById.fulfilled, (state, { payload }) => {
      state.cartItems = payload.data;
    });
    builder.addCase(getCartById.rejected, (state, action) => {
      state.errorMessage = "Error loading cart items";
    });

    // Add item to cart
    builder.addCase(addItemToCart.fulfilled, (state, { payload }) => {
      state.cartItems.push(payload.data); // Add new item to cart
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.errorMessage = "Error adding item to cart";
    });

    // Update cart item
    builder.addCase(updateCartItem.fulfilled, (state, { payload }) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === payload.data.id
      );
      if (index !== -1) {
        state.cartItems[index] = payload.data; // Update the cart item
      }
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.errorMessage = "Error updating cart item";
    });
  },
});

export default cartSlice.reducer;
