import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

const Filters = ({ onApplyFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const handleApplyFilters = () => {
    const filters = {
      category: selectedCategory,
      priceRange: selectedPriceRange,
      rating: selectedRating,
    };
    // console.log(filters);
    onApplyFilters(filters);
  };

  useEffect(() => {
    handleApplyFilters(); // Trigger the filter application when filters change
  }, [selectedCategory, selectedPriceRange, selectedRating]);

  const Categories = [
    { value: "1", label: "Electronics" },
    { value: "2", label: "Fashion" },
    { value: "3", label: "Home & Kitchen" },
    { value: "4", label: "Books" },
    { value: "5", label: "Sports" },
    { value: "6", label: "Beauty" },
  ];

  const Ratings = [
    { value: "4-5", label: "4★ & above" },
    { value: "3-5", label: "3★ & above" },
    { value: "2-5", label: "2★ & above" },
    { value: "1-5", label: "1★ & above" },
  ];

  const Price = [
    { value: "0-500", label: "₹0 - ₹500" },
    { value: "500-1000", label: "₹500 - ₹1000" },
    { value: "1000-5000", label: "₹1000 - ₹5000" },
    { value: "5000-10000", label: "₹5000 - ₹10000" },
  ];

  return (
    <div className="p-2 bg-white flex gap-8 justify-left items-center px-10">
      <div className="mb-4 border rounded-md p-2 mt-4 flex justify-center items-center hover:shadow-xl transition">
        Filters
        <IoFilterOutline className="ml-8" />
      </div>
      <select
        className="border rounded-md p-2"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value), handleApplyFilters();
        }}
      >
        <option value="">Categories</option>
        {Categories.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      <select
        className="border rounded-md p-2"
        value={selectedPriceRange}
        onChange={(e) => {
          setSelectedPriceRange(e.target.value), handleApplyFilters();
        }}
      >
        <option value="">Price</option>
        {Price.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <select
        className="border rounded-md p-2"
        value={selectedRating}
        onChange={(e) => {
          setSelectedRating(e.target.value), handleApplyFilters();
        }}
      >
        <option value="">Rating</option>
        {Ratings.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
      {/* <button
        onClick={handleApplyFilters}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Apply Filters
      </button> */}
    </div>
  );
};

export default Filters;
