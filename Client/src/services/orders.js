import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import backendUrl from "../../Helper/environmentSetup";

const url = backendUrl("graphql");

export const OrdersAPI = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("x-hasura-admin-secret", "Tsk_2003");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateOrders: builder.mutation({
      query: ({ userId, totalPrice, status, orderItems, payments,address,date }) => ({
        method: "POST",
        body: JSON.stringify({
          query: `
                        mutation insertIntoOrders($userId: Int!, $totalPrice: numeric!, $status: String!, $orderItems: [order_items_insert_input!]!, $payments: [payments_insert_input!]!,$address:String!,$date:date!) {
                            insert_orders(objects: {
                                user_id: $userId, 
                                total_price: $totalPrice, 
                                status: $status, 
                                order_items: { data: $orderItems }, 
                                payments: { data: $payments },
                                shippings: {data: {shipping_details: $address, estimated_delivery_date: $date}}
                            }) {
                                affected_rows
                            }
                        }
                    `,
          variables: {
            userId,
            totalPrice: parseFloat(totalPrice), // Ensure numeric type
            status,
            orderItems: Array.isArray(orderItems) ? orderItems : [orderItems], // Ensure array format
            payments: Array.isArray(payments) ? payments : [payments], // Ensure array format
            address,
            date
          },
        }),
      }),
    }),

    viewOrders: builder.query({
      query: (userId) => ({
        method: "POST",
        body: JSON.stringify({
          query: `
                query ViewOrders($id:Int!) {
                    orders(where: {user_id: {_eq: $id}}) {
                        order_date
                        status
                        user_id
                        order_id
                        total_price
                        payments {
                            amount
                            payment_method
                            payment_status
                        }
                        order_items {
                            product {
                                product_id
                                image_url
                                name
                                price
                                description
                            }
                        quantity
                        }
                        shippings {
                          estimated_delivery_date
                          shipping_details
                          shipping_status
                        }
                    }
                }
                `,
            variables:{id:userId}
        }),
      }),
    }),
  }),
});

export const { useUpdateOrdersMutation,useViewOrdersQuery } = OrdersAPI;
