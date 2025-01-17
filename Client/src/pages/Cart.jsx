import React, { useEffect, useState } from "react";
import Layout from "../Layout.jsx";
import { useGetCartDetailsQuery } from "../services/cart.js";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [quantities, setQuantities] = useState({}); // Object to track quantities per item

  // Fetch cart details based on userId
  const { data, isLoading, error } = useGetCartDetailsQuery(userId);

  // Ensure data is an array
  const cartItems = Array.isArray(data) ? data : [];

  useEffect(() => {
    // Initialize quantities based on cart data
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.cart_id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const incrementQuantity = (cartId) => {
    setQuantities((prev) => ({
      ...prev,
      [cartId]: prev[cartId] + 1,
    }));
  };

  const decrementQuantity = (cartId) => {
    setQuantities((prev) => ({
      ...prev,
      [cartId]: prev[cartId] > 1 ? prev[cartId] - 1 : 1,
    }));
  };

  // Calculate the total value
  const totalValue = cartItems.reduce((total, item) => {
    const quantity = quantities[item.cart_id] || 1;
    return total + item?.product?.price * quantity;
  }, 0);

  // Handle loading, error, and data display
  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return <Layout>Error: {error.message}</Layout>;
  }

  return (
    <Layout>
      <div className="py-16 px-10 bg-gray-100">
        <div className="cart-items max-w-5xl mx-auto">
          {cartItems.map((item) => (
            <div
              key={item?.cart_id}
              className="cart-item flex justify-between py-6 px-4 bg-white shadow-lg rounded-lg mb-6 transition-transform transform hover:scale-105"
            >
              <img
                src={item?.product?.image_url}
                alt={item?.product?.name}
                className="w-24 h-24 object-cover rounded-lg border shadow-md"
              />
              <div className="flex-1 ml-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item?.product?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {item?.product?.description}
                </p>
                <p className="text-base font-medium text-gray-900 mt-2">
                  Price: ${item?.product?.price}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-3 border-2 rounded-md w-auto">
                  <button
                    onClick={() => decrementQuantity(item.cart_id)}
                    className="text-xl text-gray-500 border-r-2 px-3 py-2"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">
                    {quantities[item.cart_id] || 1}
                  </span>
                  <button
                    onClick={() => incrementQuantity(item.cart_id)}
                    className="text-xl text-gray-500 border-l-2 px-3 py-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Section */}
        <div className="checkout-section mt-12 text-right">
          <div className="total-value text-lg font-medium text-gray-800 mb-4">
            Total: ${totalValue.toFixed(2)}
          </div>
          <button className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
