import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseApi } from "../apis/BaseApi";

export const getAll = createAsyncThunk(
  "user/getAll",
  async ({ page, limit, searchTerm }) => {
    console.log("🚀 ~ searchTerm:", searchTerm);
    try {
      const response = await BaseApi.get("/api/user", {
        params: { page: page - 1, limit, searchTerm },
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }
);
