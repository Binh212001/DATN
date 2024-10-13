import { combineReducers, configureStore } from "@reduxjs/toolkit";
import catalogSlice from "./catalogSlice";
import sizeSlice from "./sizeSlice";
import colorSlice from "./colorSlice";
import productSlice from "./productSilce";
import cartSlice from "./cartSlice";

const rootReducer = combineReducers({
  catalog: catalogSlice,
  size: sizeSlice,
  color: colorSlice,
  product: productSlice,
  cart: cartSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
