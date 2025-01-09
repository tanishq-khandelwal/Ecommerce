import { configureStore } from "@reduxjs/toolkit";
import { ProductsAPI } from "../services/products";

const store = configureStore({
  reducer: {
    // Add the ProductsAPI reducer
    [ProductsAPI.reducerPath]: ProductsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductsAPI.middleware),
});

export default store;
