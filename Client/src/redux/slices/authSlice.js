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
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
    },
    logout: (state) => {
        state.isLoggedIn = false, 
        user = null;
    },
  },
});

export const { setCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
