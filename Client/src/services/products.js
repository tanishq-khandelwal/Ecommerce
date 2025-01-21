import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import backendUrl from "../../Helper/environmentSetup";

// Use the backend URL for GraphQL
const url = backendUrl("graphql");

export const ProductsAPI = createApi({
  reducerPath: "fetchProducts",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("x-hasura-admin-secret", "Tsk_2003");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch all products
    fetchProducts: builder.query({
      query: () => ({
        method: "POST",
        body: JSON.stringify({
          query: `
            query GetProducts {
              products(where: { product_id: {} }) {
                category_id
                created_at
                description
                image_url
                stock_quantity
                updated_at
                name
                price
                product_id
                reviews_aggregate {
                  aggregate {
                    avg {
                      rating
                    }
                  }
                }
              }
            }
          `,
        }),
      }),
      transformResponse: (response) => response.data.products,
    }),

    // Fetch product details by ID
    getProductdetail: builder.query({
      query: (productId) => ({
        method: "POST",
        body: JSON.stringify({
          query: `
            query GetProductDetails($id:Int!) {
              products(where: { product_id: { _eq: $id} }) {
                description
                image_url
                name
                price
                category {
                  category_id
                  name
                  description
                }
              reviews_aggregate {
                aggregate {
                  avg {
                    rating
                  }
                  count
                }
              }
              }
            }
          `,
          variables: { id: productId },
        }),
      }),
      transformResponse: (response) => response.data.products[0],
    }),
  }),
});

export const { useFetchProductsQuery, useGetProductdetailQuery } = ProductsAPI;
