import { createSlice } from "@reduxjs/toolkit";
import {
  createCatalog,
  getCatalogs,
  removeCatalog,
  updateCatalog,
} from "./catalogAtion";
import { openNotification } from "../pages/catalog/CatalogConf";

const initialState = {
  catalog: [],
  errorMessage: "",
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get
    builder.addCase(getCatalogs.fulfilled, (state, { payload }) => {
      state.catalog = payload.data;
    });
    builder.addCase(getCatalogs.rejected, (state, action) => {
      state.errorMessage = "Error loading catalog";
    });
    //add
    builder.addCase(createCatalog.fulfilled, (state, { payload }) => {
      openNotification("Thêm danh mục", payload.message);
      state.catalog.push(payload.data);
    });
    builder.addCase(createCatalog.rejected, (state, action) => {
      state.errorMessage = "Error loading catalog";
    });
    //update
    builder.addCase(updateCatalog.fulfilled, (state, { payload }) => {
      console.log(payload.status);
      if (payload.status === 200) {
        const index = state.catalog.findIndex(
          (item) => item.id === payload.data.id
        );
        state.catalog[index] = payload.data;
        openNotification("Cập nhật danh mục", payload.message);
      } else {
        state.errorMessage = payload.message;
      }
    });
    builder.addCase(updateCatalog.rejected, (state, action) => {
      state.errorMessage = "Error loading catalog";
    });
    //remove
    builder.addCase(removeCatalog.fulfilled, (state, { payload }) => {
      const { ids, res } = payload;
      const updatedCatalog = state.catalog.filter(
        (item) => !ids.includes(item.id)
      );
      state.catalog = updatedCatalog;
      openNotification("Xóa danh mục", res.message);
      state.catalog.push(payload.data);
    });
    builder.addCase(removeCatalog.rejected, (state, action) => {
      state.errorMessage = "Error loading catalog";
    });
  },
});

export default catalogSlice.reducer;
