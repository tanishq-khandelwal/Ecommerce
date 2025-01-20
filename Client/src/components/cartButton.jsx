import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import {
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveCartMutation,
} from "../services/cart";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const CartButton = ({ productId, refetchCart }) => {
  const dispatch = useDispatch();
  const [addToCartAPI, { isLoading: isAdding }] = useAddToCartMutation();
  const [updateCartAPI] = useUpdateCartMutation();
  const [removeCartAPI] = useRemoveCartMutation();

  const data = useSelector((state) => state.cart.cartDetails);
  const item = data?.find((item) => item.product_id === productId);
  const quantity = item ? item.quantity : 0;
  const [currentQuantity, setQuantity] = useState(quantity);
  const userId = localStorage.getItem("userId");

  const incrementQuantity = async () => {
    const newQuantity = currentQuantity + 1;
    setQuantity(newQuantity);
    dispatch(addToCart({ quantity: newQuantity, product_id: productId }));
    await updateCartAPI({ productId, userId, quantity: newQuantity });
    refetchCart(); // Refresh cart data
  };

  const decrementQuantity = async () => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      dispatch(
        removeFromCart({ quantity: newQuantity, product_id: productId })
      );
      await updateCartAPI({ productId, userId, quantity: newQuantity });
    } else {
      setQuantity(0);
      await removeCartAPI({ userId, productId });
      dispatch(removeFromCart({ quantity: 0, product_id: productId }));
    }
    refetchCart(); // Refresh cart data
  };

  return (
    <div>
      {!item ? (
        <button
          onClick={() => incrementQuantity()}
          className="px-10 py-4 bg-blue-500 text-white rounded-md"
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      ) : (
        <div className="flex items-center space-x-3 border-2 rounded-md w-auto">
          <button
            onClick={decrementQuantity}
            className="text-xl text-gray-500 border-r-2 px-3 py-2"
          >
            -
          </button>
          <span className="text-lg font-semibold">{currentQuantity}</span>
          <button
            onClick={incrementQuantity}
            className="text-xl text-gray-500 border-l-2 px-3 py-2"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default CartButton;
