import { createSlice } from "@reduxjs/toolkit";
import { createColor, getColors, removeColor, updateColor } from "./colorAtion";
import { openNotification } from "../pages/catalog/CatalogConf";

const initialState = {
  colors: [],
  errorMessage: "",
};

export const ColorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get
    builder.addCase(getColors.fulfilled, (state, { payload }) => {
      state.colors = payload.data;
    });
    builder.addCase(getColors.rejected, (state, action) => {
      state.errorMessage = "Error loading Color";
    });
    //add
    builder.addCase(createColor.fulfilled, (state, { payload }) => {
      openNotification("Thêm Color", payload.message);
      state.colors.push(payload.data);
    });
    builder.addCase(createColor.rejected, (state, action) => {
      state.errorMessage = "Error loading Color";
    });
    // //update
    builder.addCase(updateColor.fulfilled, (state, { payload, res }) => {
      if (payload.res.status === 200) {
        const index = state.colors.findIndex(
          (item) => item.id === payload.data.id
        );
        state.colors[index] = payload.data;
        openNotification("Cập nhật Color", payload.res.message);
      } else {
        state.errorMessage = payload.message;
      }
    });
    builder.addCase(updateColor.rejected, (state, action) => {
      state.errorMessage = "Error loading Color";
    });
    //remove
    builder.addCase(removeColor.fulfilled, (state, { payload }) => {
      const { ids, res } = payload;
      if (res.status === 200) {
        const updatedColor = state.colors.filter(
          (item) => !ids.includes(item.id)
        );
        state.colors = updatedColor;
        openNotification("Xóa Color", res.message);
        state.colors.push(payload.data);
      } else {
        openNotification("Xóa Color", res.message);
      }
    });
    builder.addCase(removeColor.rejected, (state, action) => {
      state.errorMessage = "Error loading Color";
    });
  },
});

export default ColorSlice.reducer;
