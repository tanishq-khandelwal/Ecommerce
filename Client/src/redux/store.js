import { configureStore } from "@reduxjs/toolkit";
import { ProductsAPI } from "../services/products";
import { UsersAPI } from "../services/users";

const store = configureStore({
  reducer: {
    // Add the ProductsAPI reducer
    [ProductsAPI.reducerPath]: ProductsAPI.reducer,
    [UsersAPI.reducerPath]:UsersAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductsAPI.middleware).concat(UsersAPI.middleware),
});

export default store;
