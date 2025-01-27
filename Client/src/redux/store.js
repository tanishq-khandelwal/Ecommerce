import { configureStore } from "@reduxjs/toolkit";
import { ProductsAPI } from "../services/products";
import { UsersAPI } from "../services/users";
import { authApi, authReducer } from "./slices/authSlice";
import { CartAPI } from "../services/cart";
import { cartReducer } from "./slices/cartSlice";
import { OrdersAPI } from "../services/orders";

const store = configureStore({
  reducer: {
    // Add the ProductsAPI reducer
    auth:authReducer,
    cart:cartReducer,
    [ProductsAPI.reducerPath]: ProductsAPI.reducer,
    [UsersAPI.reducerPath]:UsersAPI.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [CartAPI.reducerPath]:CartAPI.reducer,
    [OrdersAPI.reducerPath]:OrdersAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductsAPI.middleware).concat(UsersAPI.middleware).concat(authApi.middleware).concat(CartAPI.middleware).concat(OrdersAPI.middleware),
});

export default store;
