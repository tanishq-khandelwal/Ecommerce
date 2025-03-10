import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import backendUrl from "../../Helper/environmentSetup";

const url = backendUrl("graphql");

export const CartAPI = createApi({
  reducerPath: "getCartDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("x-hasura-admin-secret", "hXdjLBZXNehHLMOdk0OMAdRk7EjMl35iyZlYemXhGRe425x54e4oLuQbFinvSy27");
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

    removeCart: builder.mutation({
      query: ({ productId, userId }) => ({
        method: "POST",
        body: JSON.stringify({
          query: `
          mutation removeFromCart($productId:Int!,$userId:Int!) {
            delete_cart(where: {user_id: {_eq: $userId}, product_id: {_eq: $productId}}) {
              affected_rows
            }
          }
          `,
          variables: { productId, userId },
        }),
      }),
    }),

    clearCart:builder.mutation({
      query:(userId)=>({
        method:"POST",
        body:JSON.stringify({
          query:`
          mutation update_cart($Id:Int!) {
            delete_cart(where: {user_id: {_eq: $Id}}) {
              affected_rows
            }
          }
          `,
          variables:{Id:userId}
        })
      })
    })
  }),
});

export const {
  useGetCartDetailsQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveCartMutation,
  useClearCartMutation
} = CartAPI;
