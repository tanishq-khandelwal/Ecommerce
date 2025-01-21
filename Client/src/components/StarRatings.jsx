import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Function to calculate the number of full, half, and empty stars
const calculateStars = (rating) => {
  const fullStars = Math.floor(rating); // Get the number of full stars
  const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Determine if there should be a half star
  const emptyStars = 5 - fullStars - halfStars; // Remaining empty stars

  return { fullStars, halfStars, emptyStars };
};

// StarRating component
const StarRating = ({ rating }) => {
  const { fullStars, halfStars, emptyStars } = calculateStars(rating);

  return (
    <div className="flex items-center">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} className="text-yellow-500" />
      ))}
      {/* Render half stars */}
      {[...Array(halfStars)].map((_, index) => (
        <FaStarHalfAlt key={`half-${index}`} className="text-yellow-500" />
      ))}
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="text-yellow-500" />
      ))}
    </div>
  );
};

export default StarRating;
