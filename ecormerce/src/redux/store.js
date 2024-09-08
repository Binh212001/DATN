import { combineReducers, configureStore } from "@reduxjs/toolkit";
import catalogSlice from "./catalogSlice";
import sizeSlice from "./sizeSlice";
import colorSlice from "./colorSlice";

const rootReducer = combineReducers({
  catalog: catalogSlice,
  size: sizeSlice,
  color: colorSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
