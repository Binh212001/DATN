import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "./productAction";

const initialState = {
  products: [],
  errorMessage: "",
};

export const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.products = payload.data;
    });
    // builder.addCase(getProducts.rejected, (state, action) => {
    //   state.errorMessage = "Error loading Product";
    // });
    // //add
    // builder.addCase(createProduct.fulfilled, (state, { payload }) => {
    //   openNotification("Thêm danh mục", payload.message);
    //   state.Product.push(payload.data);
    // });
    // builder.addCase(createProduct.rejected, (state, action) => {
    //   state.errorMessage = "Error loading Product";
    // });
    // //update
    // builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
    //   console.log(payload.status);
    //   if (payload.status === 200) {
    //     const index = state.Product.findIndex(
    //       (item) => item.id === payload.data.id
    //     );
    //     state.Product[index] = payload.data;
    //     openNotification("Cập nhật danh mục", payload.message);
    //   } else {
    //     state.errorMessage = payload.message;
    //   }
    // });
    // builder.addCase(updateProduct.rejected, (state, action) => {
    //   state.errorMessage = "Error loading Product";
    // });
    // //remove
    // builder.addCase(removeProduct.fulfilled, (state, { payload }) => {
    //   const { ids, res } = payload;
    //   const updatedProduct = state.Product.filter(
    //     (item) => !ids.includes(item.id)
    //   );
    //   state.Product = updatedProduct;
    //   openNotification("Xóa danh mục", res.message);
    //   state.Product.push(payload.data);
    // });
    // builder.addCase(removeProduct.rejected, (state, action) => {
    //   state.errorMessage = "Error loading Product";
    // });
  },
});

export default productSlice.reducer;
