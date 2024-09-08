import { createSlice } from "@reduxjs/toolkit";
import { createSize, getSizes, removeSize, updateSize } from "./sizeAtion";
import { openNotification } from "../pages/catalog/CatalogConf";

const initialState = {
  sizes: [],
  errorMessage: "",
};

export const SizeSlice = createSlice({
  name: "Size",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get
    builder.addCase(getSizes.fulfilled, (state, { payload }) => {
      state.sizes = payload.data;
    });
    builder.addCase(getSizes.rejected, (state, action) => {
      state.errorMessage = "Error loading Size";
    });
    //add
    builder.addCase(createSize.fulfilled, (state, { payload }) => {
      openNotification("Thêm size", payload.message);
      state.sizes.push(payload.data);
    });
    builder.addCase(createSize.rejected, (state, action) => {
      state.errorMessage = "Error loading Size";
    });
    // //update
    builder.addCase(updateSize.fulfilled, (state, { payload, res }) => {
      if (payload.res.status === 200) {
        const index = state.sizes.findIndex(
          (item) => item.id === payload.data.id
        );
        state.sizes[index] = payload.data;
        openNotification("Cập nhật size", payload.res.message);
      } else {
        state.errorMessage = payload.message;
      }
    });
    builder.addCase(updateSize.rejected, (state, action) => {
      state.errorMessage = "Error loading Size";
    });
    //remove
    builder.addCase(removeSize.fulfilled, (state, { payload }) => {
      const { ids, res } = payload;
      if (res.status === 200) {
        const updatedSize = state.sizes.filter(
          (item) => !ids.includes(item.id)
        );
        state.sizes = updatedSize;
        openNotification("Xóa size", res.message);
        state.sizes.push(payload.data);
      } else {
        openNotification("Xóa size", res.message);
      }
    });
    builder.addCase(removeSize.rejected, (state, action) => {
      state.errorMessage = "Error loading Size";
    });
  },
});

export default SizeSlice.reducer;
