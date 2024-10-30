import { createSlice } from "@reduxjs/toolkit";
import { getAll } from "./userAction";

const initialState = {
  users: [],
  status: 200,
  totalElements: 0,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get
    builder.addCase(getAll.fulfilled, (state, { payload }) => {
      state.users = payload.data;
      state.totalElements = payload.totalElements;
      state.status = payload.status;
    });
    builder.addCase(getAll.rejected, (state, action) => {
      state.errorMessage = "Error loading Product";
    });
  },
});

export default userSlice.reducer;
