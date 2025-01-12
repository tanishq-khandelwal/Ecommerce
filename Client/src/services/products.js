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
      headers.set(
        "x-hasura-admin-secret",
        "XQFyYZkJ48TUd3LeJ3YDzVfYoURp5DEKcy1QDubTMhJQtw01vjjnlUjj5Vzsx55J"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
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
    }
  }
          `,
        }),
      }),
      transformResponse: (response) => response.data.products,
    }),
  }),
});

export const { useFetchProductsQuery } = ProductsAPI;
