import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseApi } from "../apis/BaseApi";

export const getSizes = createAsyncThunk("size/getSizes", async () => {
  try {
    const response = await BaseApi.get("/api/sizes");
    return response;
  } catch (e) {
    throw e.message;
  }
});

export const createSize = createAsyncThunk("size/createSize", async (data) => {
  try {
    const res = await BaseApi.post("/api/sizes", data);
    return res;
  } catch (e) {
    throw e.message;
  }
});

export const updateSize = createAsyncThunk("size/updateSize", async (data) => {
  try {
    const res = await BaseApi.put("/api/sizes/" + data.id, data);
    return { res, data };
  } catch (e) {
    throw e.message;
  }
});

export const removeSize = createAsyncThunk("size/removeSize", async (ids) => {
  console.log("🚀 ~ removeSize ~ ids:", ids);
  try {
    const res = await BaseApi.delete("/api/sizes", { data: ids });
    return { res, ids };
  } catch (e) {
    throw e.message;
  }
});
