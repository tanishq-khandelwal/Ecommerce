import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import backendUrl from "../../Helper/environmentSetup";

const url = backendUrl("graphql");

export const CartAPI = createApi({
  reducerPath: "getCartDetails",
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
    getCartDetails: builder.query({
      query: (userId) => ({
        method: "POST",
        body: JSON.stringify({
          query: `
                        query MyQuery($id:Int!) {
                            cart(where: {user_id: {_eq: $id}}) {
                                cart_id
                                product {
                                    image_url
                                    price
                                    product_id
                                    name
                                    description
                                }
                            }
                        }
                    `,
          variables: { id: userId },
        }),
      }),

      transformResponse:(response)=>response.data.cart[0].product
    }),
  }),
});

export const { useGetCartDetailsQuery } = CartAPI;
