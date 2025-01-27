import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { useAddToCartMutation, useUpdateCartMutation, useRemoveCartMutation } from "../services/cart";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const AddToCartButton = ({price}) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get("productId"), 10); // Convert to number

  const [addToCartAPI, { isLoading: isAdding }] = useAddToCartMutation();
  const [updateCartAPI, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [removeCartAPI, { isLoading: isRemoving }] = useRemoveCartMutation();

  const data = useSelector((state) => state.cart.cartDetails);
  const item = data?.find((item) => item.product_id === productId);

  const quantity = item ? item.quantity : 0;

  const [currentQuantity, setQuantity] = useState(quantity);

  const userId = localStorage.getItem("userId");

  const debounceUpdateCart = useCallback(
    debounce((newQuantity) => {
      updateCartAPI({ productId, userId, quantity: newQuantity })
        .unwrap()
        .catch((error) => console.error("Error occurred while updating cart:", error));
    }, 300),
    []
  );

  const incrementQuantity = () => {
    const newQuantity = currentQuantity + 1;
    setQuantity(newQuantity); // Update quantity in state immediately
    dispatch(addToCart({ quantity: newQuantity, product_id: productId,price}));
    debounceUpdateCart(newQuantity); // Debounced API call
  };

  const decrementQuantity = () => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      dispatch(removeFromCart({ quantity: newQuantity, product_id: productId }));
      debounceUpdateCart(newQuantity); // Debounced API call
    } else {
      setQuantity(0);
      removeCartAPI({ userId, productId })
        .unwrap()
        .then(() => {
          dispatch(removeFromCart({ quantity: 0, product_id: productId }));
        })
        .catch((error) => console.error("Error occurred while removing from cart:", error));
    }
  };

  const handleAddToCart = () => {
    setQuantity(1); // Update quantity in state immediately
    dispatch(addToCart({ quantity: 1, product_id: productId,price}));
    addToCartAPI({ userId, productId, quantity: 1,price })
      .unwrap()
      .catch((error) => console.error("Error occurred while adding to cart:", error));
  };

  return (
    <div>
      {!item ? (
        <button
          onClick={() => handleAddToCart(currentQuantity)}
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
            // disabled={isUpdating}
          >
            -
          </button>
          <span className="text-lg font-semibold">{currentQuantity}</span>
          <button
            onClick={incrementQuantity}
            className="text-xl text-gray-500 border-l-2 px-3 py-2"
            // disabled={isUpdating}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
