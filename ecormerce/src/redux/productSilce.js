import { createSlice } from "@reduxjs/toolkit";
import {
  filterProduct,
  findByCatId,
  getProducts,
  getProductSale,
} from "./productAction";

const initialState = {
  products: [],
  currentPage: 1,
  totalPages: 1,
  totalElements: 1,
  productsSale: [],
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
    builder.addCase(getProducts.rejected, (state, action) => {
      state.errorMessage = "Error loading Product";
    });
    //get
    builder.addCase(getProductSale.fulfilled, (state, { payload }) => {
      state.productsSale = payload;
    });
    builder.addCase(getProductSale.rejected, (state, action) => {
      state.errorMessage = "Error loading Product";
    });

    //get
    builder.addCase(filterProduct.fulfilled, (state, { payload }) => {
      state.products = payload.data;
      state.currentPage = payload.currentPage;
      state.totalPages = payload.totalPages;
      state.totalElements = payload.totalElements;
    });
    builder.addCase(filterProduct.rejected, (state, action) => {
      state.errorMessage = "Error loading Product";
    });
    //get
    builder.addCase(findByCatId.fulfilled, (state, { payload }) => {
      state.products = payload.data;
    });
    builder.addCase(findByCatId.rejected, (state, action) => {
      state.errorMessage = "Error loading Product";
    });
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
