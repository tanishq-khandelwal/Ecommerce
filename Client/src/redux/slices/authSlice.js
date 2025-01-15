import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/user",
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "login",
        method: "POST",
        body: loginData,
      }),
    }),

    logout:builder.mutation({
        query:()=>({
            url:"logout",
            method:"POST",
        })
    }),

    signup:builder.mutation({
      query:(signupData)=>({
        url:"register",
        method:"POST",
        body:signupData
      })
    })
  }),
});

export const { useLoginMutation,useLogoutMutation,useSignupMutation } = authApi;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
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
