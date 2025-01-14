import { configureStore } from "@reduxjs/toolkit";
import { ProductsAPI } from "../services/products";
import { UsersAPI } from "../services/users";
import { authApi } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    // Add the ProductsAPI reducer
    [ProductsAPI.reducerPath]: ProductsAPI.reducer,
    [UsersAPI.reducerPath]:UsersAPI.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductsAPI.middleware).concat(UsersAPI.middleware).concat(authApi.middleware),
});

export default store;
