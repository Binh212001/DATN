import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseApi } from "../apis/BaseApi";

export const getCatalogs = createAsyncThunk("catalog/getCatalogs", async () => {
  try {
    const response = await BaseApi.get("/api/categories");
    return response;
  } catch (e) {
    throw e.message;
  }
});

export const createCatalog = createAsyncThunk(
  "catalog/createCatalog",
  async (data) => {
    try {
      const res = await BaseApi.post("/api/categories", data);
      return res;
    } catch (e) {
      throw e.message;
    }
  }
);

export const updateCatalog = createAsyncThunk(
  "catalog/updateCatalog",
  async (data) => {
    try {
      const res = await BaseApi.put("/api/categories/" + data.id, data);
      return res;
    } catch (e) {
      throw e.message;
    }
  }
);

export const removeCatalog = createAsyncThunk(
  "catalog/removeCatalog",
  async (ids) => {
    try {
      const res = await BaseApi.delete("/api/categories", { data: ids });
      return { res, ids };
    } catch (e) {
      throw e.message;
    }
  }
);
