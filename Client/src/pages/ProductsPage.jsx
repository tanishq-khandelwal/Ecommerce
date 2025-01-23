import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useFetchProductsQuery } from "../services/products";
import Filters from "../components/Filters";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRatings";

const ProductsPage = () => {
  const { data, error, isLoading } = useFetchProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const handleProductClick = (product_id) => {
    navigate(`/product?productId=${product_id}`);
  };

  const handleApplyFilters = (filters) => {
    if (!data) return;

    // console.log("Applied filters are:", filters);
    const filtered = data.filter((product) => {
      const matchesCategory =
        !filters.category || product.category_id === Number(filters.category);
      const matchesPrice =
        !filters.priceRange ||
        (product.price >= parseInt(filters.priceRange.split("-")[0]) &&
          product.price <= parseInt(filters.priceRange.split("-")[1]));
      const matchesRating =
        !filters.rating ||
        product.reviews_aggregate.aggregate.avg.rating >= parseInt(filters.rating.split("-")[0]);

      return matchesCategory && matchesPrice && matchesRating;
    });
    setFilteredProducts(filtered);
  };

  // Set initial filteredProducts on page load if no filters are applied
  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
    }
  }, [data]);

  console.log(filteredProducts);

  return (
    <Layout>
      <Filters onApplyFilters={handleApplyFilters} />
      <div className="py-16 px-10">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {filteredProducts.map((product) => (
              <div
                key={product.product_id}
                className="bg-white p-1 border rounded-lg shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={product.image_url}
                  alt="product"
                  className="w-full h-60 object-contain rounded-lg mb-4"
                />
                <div className="px-2 py-2 text-left">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                    </div>
                    <div className="flex justify-center items-center">
                      <StarRating
                        rating={product.reviews_aggregate.aggregate.avg.rating}
                      />
                    </div>
                  </div>
                  <p>{product.description}</p>
                  <p className="text-red-600 font-sans font-semibold text-xl">
                  ₹{product.price}
                  </p>

                  <div className="items-center justify-center flex">
                    <button
                      className="mt-4 px-10 w-auto py-2 bg-[#1E55DE] text-white rounded-lg hover:bg-blue-600"
                      onClick={() => {
                        handleProductClick(product.product_id);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p> </p>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
