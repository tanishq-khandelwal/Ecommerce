import React, { useEffect, useState } from "react";
import Layout from "../Layout.jsx";
import { useGetCartDetailsQuery, useRemoveCartMutation } from "../services/cart.js";
import CartButton from "../components/cartButton.jsx";
import { removeFromCart } from "../redux/slices/cartSlice.js";
import { useDispatch } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [quantities, setQuantities] = useState({});
  const { data, isLoading, error, refetch } = useGetCartDetailsQuery(userId);
  const [removeCartAPI] = useRemoveCartMutation();
  
  const cartItems = Array.isArray(data) ? data : [];

  useEffect(() => {
    if (cartItems.length > 0) {
      const initialQuantities = {};
      cartItems.forEach((item) => {
        initialQuantities[item.cart_id] = item.quantity || 1; // Default to 1 if no quantity is present
      });
      setQuantities(initialQuantities);
    }
  }, [cartItems]);

  const totalValue = cartItems.reduce((total, item) => {
    const quantity = quantities[item.cart_id] || 1;
    const price = item?.product?.price || 0; // Handle missing price gracefully
    return total + price * quantity;
  }, 0);

  const handleRemoveItem = async (userId, productId) => {
    try {
      // Optimistically remove the item from local state
      dispatch(removeFromCart({ quantity: 0, product_id: productId }));
      
      // Call API to remove the item
      await removeCartAPI({ userId, productId }).unwrap();
      
      // Refetch to sync with the server
      refetch();
    } catch (err) {
      console.error("Failed to remove item:", err);
      // Optionally, dispatch a rollback action here if needed
      // dispatch(addToCart({ ...item }));  // Example rollback if you want to undo
    }
  };

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
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item?.product.product_id}
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
                <div className="flex gap-4 items-center">
                  <CartButton productId={item?.product?.product_id} refetchCart={refetch} />
                  <button
                    className="flex items-center px-8 py-2 border-2 rounded-md text-white bg-red-600"
                    onClick={() => handleRemoveItem(userId, item?.product?.product_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              <p className="text-2xl font-sans font-bold">Your Cart is Empty</p>
            </div>
          )}
        </div>

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
