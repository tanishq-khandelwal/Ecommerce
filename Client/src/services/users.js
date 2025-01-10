import backendUrl from "../../Helper/environmentSetup";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = backendUrl("graphql");

export const UsersAPI = createApi({
  reducerPath: "signupUser",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set(
        "x-hasura-admin-secret",
        "XQFyYZkJ48TUd3LeJ3YDzVfYoURp5DEKcy1QDubTMhJQtw01vjjnlUjj5Vzsx55J"
      );
      return headers;
    },
  }),

  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (user) => ({
        method:"POST",
        body: {
          query: `
            mutation SignUp($registerInput: registerInput!) {
              RegisterUser(input: $registerInput) {
                user_id
              }
            }
          `,
          variables: {
            registerInput: user,
          },
        },
      }),
    }),
  }),
});

// Ensure the hook is generated
export const {useSignupUserMutation}=UsersAPI;
