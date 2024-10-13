import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseApi } from "../apis/BaseApi";

// Fetch the cart items
export const getCartById = createAsyncThunk("cart/getCart", async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("🚀 ~ getCartById ~ user:", user);
    const response = await BaseApi.get("/api/carts/userId/" + user.id);
    return response;
  } catch (e) {
    throw e.message;
  }
});

// Add an item to the cart
export const addItemToCart = createAsyncThunk("cart/addItem", async (item) => {
  try {
    const response = await BaseApi.post("/api/carts", item); // Assuming 'item' contains product details
    return response;
  } catch (e) {
    throw e.message;
  }
});

// Update the quantity of an item in the cart
export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async (item) => {
    try {
      const response = await BaseApi.put("/api/carts/" + item.id, item); // Update the item using its ID
      return response;
    } catch (e) {
      throw e.message;
    }
  }
);
