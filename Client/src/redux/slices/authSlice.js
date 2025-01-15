import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/user",
    credentials: "include", // Move this inside fetchBaseQuery
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true", // Check localStorage for login state
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null, // Retrieve user data from localStorage if available
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(user));
      state.isLoggedIn = true;
      state.user = user;
    },
    logout: (state) => {
      state.isLoggedIn = false,
      state.user = null,
      localStorage.clear();
    },
  },
});

export const { setCredentials,logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
