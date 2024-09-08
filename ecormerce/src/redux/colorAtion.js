import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseApi } from "../apis/BaseApi";

export const getColors = createAsyncThunk("Color/getColors", async () => {
  try {
    const response = await BaseApi.get("/api/colors");
    return response;
  } catch (e) {
    throw e.message;
  }
});

export const createColor = createAsyncThunk(
  "Color/createColor",
  async (data) => {
    try {
      const res = await BaseApi.post("/api/colors", data);
      return res;
    } catch (e) {
      throw e.message;
    }
  }
);

export const updateColor = createAsyncThunk(
  "Color/updateColor",
  async (data) => {
    try {
      const res = await BaseApi.put("/api/colors", data);
      return { res, data };
    } catch (e) {
      throw e.message;
    }
  }
);

export const removeColor = createAsyncThunk(
  "Color/removeColor",
  async (ids) => {
    try {
      const res = await BaseApi.delete("/api/colors", { data: ids });
      return { res, ids };
    } catch (e) {
      throw e.message;
    }
  }
);
