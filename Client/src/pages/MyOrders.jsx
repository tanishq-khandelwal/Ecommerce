import React from "react";
import Layout from "../Layout";
import { useViewOrdersQuery } from "../services/orders";

const MyOrders = () => {
  const userId = localStorage.getItem("userId");
  const { data, isLoading, isError, error } = useViewOrdersQuery(userId);

  console.log(data);
  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-4">Loading your orders...</div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="text-center text-red-500 py-4">
          Error loading orders: {error.message}
        </div>
      </Layout>
    );
  }

  if (!data || data.data.orders.length === 0) {
    return (
      <Layout>
        <div className="text-center py-4">You have no orders.</div>
      </Layout>
    );
  }

  function convertToNormalDate(isoDate) {
    const date = new Date(isoDate);

    // Format day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" }); // Get short month name (e.g., "Jan")
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return (
    <Layout>
      {/* <div className="text-2xl font-semibold text-center mb-8">My Orders</div> */}
      <div className="px-4 py-2 space-y-6">
        {data.data.orders.map((order) => (
          <div
            key={order.order_id}
            className="bg-white border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="mb-4 flex gap-6 justify-start items-center">
              <div className="text-lg font-bold">
                Order ID: {order.order_id}
              </div>
              <div className="text-sm text-gray-500">
                Order Date: {convertToNormalDate(order.order_date)}
              </div>
              <div className="text-sm text-green-600">
                Estimated Delivery: {order.estimated_delivery}
              </div>
              <div className="text-sm text-grey-500">
                Status: {order.status}
              </div>
            </div>

            <div className="mb-4">
              <ul className="space-y-4">
                {order.order_items.map((item) => (
                  <li
                    key={item.product.product_id}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                    <div className="flex-grow">
                      <div className="font-semibold">{item.product.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.product.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold font-sans">
                        {" "}
                        ₹{item.product.price}
                      </div>
                      {/* <div className="font-bold">₹{item.quantity * item.product.price}</div> */}
                      <div className="font-medium text-gray-500">
                        Qty;{item.quantity}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <div>Order Details</div>
              <div>
                <div>Payment Method: {order.payments[0].payment_method}</div>
              </div>
              <div className="text-right">
                <div>Delivery Address:</div>
                <div>{order.delivery_address}</div>
                <div>{order.delivery_contact}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default MyOrders;
