import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToCart,removeFromCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
const AddToCartButton = () => {
  const dispatch=useDispatch();
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get('productId'), 10); // Convert to number
  // console.log("Product ID from URL:", productId);
  const [addedToCart, setAddedToCart] = useState(false);

  const data = useSelector((state) => state.cart.cartDetails);

  // console.log("Cart details:", data);

  // Find the item with the correct product_id (convert productId to number)
  const item = data?.find((item) => item.product_id === productId);

  // console.log("Found item:", item);

  const quantity = item ? item.quantity : 0;
  // console.log("Quantity is:", quantity);

  const [currentQuantity,setQuantity]=useState(quantity);

  // const handleAddToCart = () => {
  //   setAddedToCart(true);

  //   addToCart(NewQuantity,productId);
  // };

  const incrementQuantity = () => {
    const NewQuantity=currentQuantity+1;
    setQuantity(currentQuantity + 1);
    dispatch(addToCart({ quantity: NewQuantity, product_id: productId }));
  };

  const decrementQuantity = () => {
    const NewQuantity=currentQuantity-1;
    if (quantity > 1) {
      setQuantity(currentQuantity - 1);
    } else {
      // setAddedToCart(false); // Reset to "Add to Cart" when quantity goes to 0
      setQuantity(0);
    }

    dispatch(removeFromCart({ quantity: NewQuantity, product_id: productId }));

  };

  return (
    <div>
      {!item ? (
        <button
          onClick={incrementQuantity}
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

export default AddToCartButton;
