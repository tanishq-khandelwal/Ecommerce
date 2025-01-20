import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

const Filters = ({ onApplyFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState();
  const [selectedRating, setSelectedRating] = useState("");

  const handleApplyFilters = () => {
    const filters = {
      category: selectedCategory,
      priceRange: selectedPriceRange,
      rating: selectedRating,
    };
    onApplyFilters(filters);
  };

  return (
    <div className="p-2 bg-white flex gap-8 justify-left items-center px-10 ">
      <div className="mb-4 border rounded-md p-2  text-left flex justify-center items-center hover:shadow-xl transition">
        Filters
        <IoFilterOutline className="ml-8"/>
        </div>

      {/* Category Filter */}
      <div className="mb-4 hover:shadow-xl transition">
        <select
          className="border rounded-md p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Furniture</option>
          <option value="books">Books</option>
        </select>
      </div>

      {/* Price Range Filter as Dropdown */}
      <div className="mb-4 hover:shadow-xl transition">
        {/* <label className="block text-sm font-medium mb-2">Price Range</label> */}
        <select
          className="w-auto border rounded-md p-2"
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
        >
          <option value="">Price</option>
          <option value="0-500">₹0 - ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-5000">₹1000 - ₹5000</option>
          <option value="5000-10000">₹5000 - ₹10,000</option>
        </select>
      </div>

      {/* Rating Filter as Dropdown */}
      <div className="mb-4 hover:shadow-xl transition">
        {/* <label className="block text-sm font-medium mb-2">Rating</label> */}
        <select
          className="w-auto border rounded-md p-2"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <option value="">Rating</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
          <option value="2">2★ & above</option>
          <option value="1">1★ & above</option>
        </select>
      </div>

      {/* Apply Button */}
      {/* <button
        onClick={handleApplyFilters}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Apply Filters
      </button> */}
    </div>
  );
};

export default Filters;
