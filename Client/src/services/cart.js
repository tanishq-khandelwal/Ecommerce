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
                                quantity
                            }
                        }
                    `,
          variables: { id: userId },
        }),
      }),
      transformResponse: (response) => response.data.cart,
    }),

    addToCart: builder.mutation({
      query: ({ userId, productId, quantity }) => ({
        method: "POST",
        body: JSON.stringify({
          query: `
          mutation addToCart($userId: Int!, $productId: Int!, $quantity: Int!) {
            insert_cart(objects: {user_id: $userId, product_id: $productId, quantity: $quantity}) {
              affected_rows
            }
          }
          `,
          variables: { userId, productId, quantity },
        }),
      }),
    }),

    updateCart: builder.mutation({
      query: ({ productId, userId, quantity }) => ({
        method: "POST",
        body: JSON.stringify({
          query: `
          mutation updateCart($productId: Int!, $userId: Int!, $quantity: Int!) {
            update_cart(where: {product_id: {_eq: $productId}, user_id: {_eq: $userId}}, 
            _set: {quantity: $quantity}) {
              affected_rows
            }
          }
          `,
          variables: { productId, userId, quantity },
        }),
      }),
    }),
  }),
});

export const { useGetCartDetailsQuery, useAddToCartMutation, useUpdateCartMutation } = CartAPI;
