import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { useAddToCartMutation, useUpdateCartMutation } from "../services/cart";

const AddToCartButton = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get("productId"), 10); // Convert to number
  
  const [addToCartAPI, { isLoading: isAdding }] = useAddToCartMutation();
  const [updateCartAPI, { isLoading: isUpdating }] = useUpdateCartMutation();

  const data = useSelector((state) => state.cart.cartDetails);
  const item = data?.find((item) => item.product_id === productId);

  const quantity = item ? item.quantity : 0;

  const [currentQuantity, setQuantity] = useState(quantity);

  const userId = localStorage.getItem("userId");

  const incrementQuantity = () => {
    const NewQuantity = currentQuantity + 1;
    setQuantity(NewQuantity); // Update quantity in state immediately
    dispatch(addToCart({ quantity: NewQuantity, product_id: productId }));
    UpdateCartHandler(NewQuantity); // Update cart via API
  };

  const decrementQuantity = () => {
    const NewQuantity = currentQuantity - 1;
    if (NewQuantity >= 1) {
      setQuantity(NewQuantity);
      dispatch(removeFromCart({ quantity: NewQuantity, product_id: productId }));
      UpdateCartHandler(NewQuantity); // Update cart via API
    } else {
      setQuantity(0);
      dispatch(removeFromCart({ quantity: 0, product_id: productId }));
    }
  };

  const handleAddToCart = (NewQuantity) => {
    // if (isAdding) return; // Prevent multiple calls if the mutation is already in progress
    incrementQuantity();
    addToCartAPI({ userId, productId, quantity: NewQuantity })
      .unwrap()
      .then(() => {
        // alert("Added to Cart");
      })
      .catch((error) => {
        console.error("Error occurred while adding to cart:", error);
      });
  };

  const UpdateCartHandler = (NewQuantity) => {
    if (isUpdating) return; // Prevent multiple calls if the mutation is already in progress

    updateCartAPI({ productId, userId, quantity: NewQuantity })
      .unwrap()
      .then(() => {
        // alert("Cart Updated");
      })
      .catch((error) => {
        console.error("Error occurred while updating cart:", error);
      });
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
            disabled={isUpdating}
          >
            -
          </button>
          <span className="text-lg font-semibold">{currentQuantity}</span>
          <button
            onClick={incrementQuantity}
            className="text-xl text-gray-500 border-l-2 px-3 py-2"
            disabled={isUpdating}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
