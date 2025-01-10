import React from "react";
import Layout from "../Layout";
import { useFetchProductsQuery } from "../services/products";
import Filters from "../components/Filters";

const ProductsPage = () => {
  const { data, error, isLoading } = useFetchProductsQuery();

  console.log(data);

  return (
    <Layout>
        <Filters/>
      <div className="py-16 px-10">
        {/* <h1 className="text-2xl font-bold mb-6">Products</h1> */}

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {data.map((product) => (
              <button
                key={product.product_id}
                className="bg-white p-1 border rounded-lg shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={product.image_url}
                  alt="product"
                  className="w-full h-60 object-contain rounded-lg mb-4"
                />

                <div className="px-2 py-2 text-left">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p>{product.description}</p>
                  <p className="text-red-600 font-sans font-semibold text-xl"> ${product.price}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
