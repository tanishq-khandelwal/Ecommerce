import { createSlice } from "@reduxjs/toolkit";

// Retrieve and parse localStorage data
let cart = [];
const data = localStorage.getItem("user");

if (data) {
  try {
    const parsedData = JSON.parse(data); // Parse the JSON string
    cart = parsedData?.data?.carts || []; // Safely access carts or fallback to an empty array
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
  }
}

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartDetails: cart, // Initialize state with retrieved cart data
  },
  reducers: {
    addToCart: (state, action) => {
      const {quantity,product_id } = action.payload;
      console.log(action.payload);
      console.log("Calling in Slice "+quantity,product_id);
      const existingItem = state.cartDetails.find((item) => item.product_id === product_id);
      if (existingItem) {
        existingItem.quantity = quantity; // Increment quantity if the item exists
      } else {
        state.cartDetails.push({product_id, quantity }); // Add a new item if it doesn't exist
      }
    },
    removeFromCart: (state, action) => {
      const {quantity,product_id} = action.payload;
      console.log(action.payload);
      console.log("Calling in Slice "+quantity,product_id);
      if(quantity===0){
        state.cartDetails = state.cartDetails.filter((item) => item.product_id !== product_id);
      }
      const existingItem = state.cartDetails.find((item) => item.product_id === product_id);
      if (existingItem) {
        existingItem.quantity = quantity; // Increment quantity if the item exists
      }

    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
