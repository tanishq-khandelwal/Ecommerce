import React, { useState } from "react";

const AddToCartButton = () => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    setAddedToCart(true);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setAddedToCart(false); // Reset to "Add to Cart" when quantity goes to 0
      setQuantity(0);
    }
  };

  return (
    <div>
      {!addedToCart ? (
        <button
          onClick={handleAddToCart}
          className="px-10 py-4 bg-blue-500 text-white rounded-md"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center space-x-3 border-2 rounded-md  w-auto">
          <button
            onClick={decrementQuantity}
            className="text-xl text-gray-500 border-r-2 px-3 py-2"
            // disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
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

export default AddToCartButton;
