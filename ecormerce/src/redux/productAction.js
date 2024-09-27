import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseApi } from "../apis/BaseApi";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    const response = await BaseApi.get("/api/products");
    return response;
  } catch (e) {
    console.log(e);
  }
});
export const filterProduct = createAsyncThunk(
  "product/filterProduct",
  async ({ price, category, sizes, id }, { rejectWithValue }) => {
    try {
      const data = {};

      if (price && price > 0) {
        data["price"] = price;
      }
      data["categories"] = category;
      data["categories"].push(parseInt(id));
      data["sizes"] = sizes;
      data["page"] = 0;
      data["size"] = 10;

      console.log(data);

      const response = await BaseApi.post("/api/products/filter", data);
      console.log("🚀 ~ response:", response);
      return response;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e.response?.data || "An error occurred");
    }
  }
);

export const findByCatId = createAsyncThunk(
  "product/findByCatId",
  async (id, { rejectWithValue }) => {
    console.log("🚀 ~ id:", id);
    try {
      const response = await BaseApi.get("/api/products/category/" + id);
      console.log("🚀 ~ response:", response);
      return response;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e.response?.data || "An error occurred");
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data) => {
    try {
      const res = await BaseApi.post("/api/products", data);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data) => {
    try {
      const res = await BaseApi.put("/api/products", data);
      return { res, data };
    } catch (e) {
      console.log(e);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (ids) => {
    try {
      const res = await BaseApi.delete("/api/products", { data: ids });
      return { res, ids };
    } catch (e) {
      throw e.message;
    }
  }
);
