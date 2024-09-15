import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseApi } from "../apis/BaseApi";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    const response = await BaseApi.get("/api/products");
    return response;
  } catch (e) {
    throw e.message;
  }
});

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data) => {
    try {
      const res = await BaseApi.post("/api/products", data);
      return res;
    } catch (e) {
      throw e.message;
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
      throw e.message;
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
