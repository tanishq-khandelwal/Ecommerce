import React, { useEffect } from "react";
import Layout from "../Layout.jsx";
import { useGetCartDetailsQuery } from "../services/cart.js";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId)

  // Fetch cart details based on userId
  const { data, isLoading, error } = useGetCartDetailsQuery(userId);

  console.log(data);

  // Handle loading, error, and data display
  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return <Layout>Error: {error.message}</Layout>;
  }

  return (
    <Layout>
      <div className="py-16 px-10">
        
        {data && data.length > 0 ? (
          <div className="cart-items">
            {data.map((item) => (
              <div key={item.id} className="cart-item flex justify-between py-4 border-b">
                <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover" />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="text-sm text-gray-500">Price: ${item.price}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p>Quantity: {item.quantity}</p>
                  <button className="text-red-500 hover:underline">Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
