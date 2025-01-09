import React from "react";
import Layout from "../Layout";
import { useFetchProductsQuery } from "../services/products";

const ProductsPage = () => {
  const { data, error, isLoading } = useFetchProductsQuery();

  console.log(data);

  return (
    <Layout>
      <div className="py-16 px-10">
        <h1 className="text-2xl font-bold mb-6">Products</h1>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        {data && (
          <ul className="space-y-4">
            {data.map((product) => (
              <li
                key={product.product_id}
                className="border p-4 rounded shadow-md"
              >
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p>{product.description}</p>
                <p className="text-gray-600">Price: ${product.price}</p>
                <p className="text-gray-600">
                  Stock: {product.stock_quantity}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
