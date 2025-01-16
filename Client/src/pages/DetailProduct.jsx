import React from "react";
import Layout from "../Layout";
import { useGetProductdetailQuery } from "../services/products";
import { useSearchParams } from "react-router-dom";
import cashpng from "../assets/cash.png";
import returnpng from "../assets/return.png";
import deliverypng from "../assets/delivery.png"

const DetailProduct = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const { data, error, isLoading } = useGetProductdetailQuery(
    parseInt(productId)
  );

  console.log(data);
  
  return (
    <Layout>
      <div className="py-16 px-10">
        {isLoading && <p className="text-center text-lg">Loading....</p>}
        {error && <p className="text-red-500 text-center">{error.message}</p>}

        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src={data.image_url}
                alt={data.name}
                className="max-w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Product Details */}
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                {data.name}
              </h2>
              <p className="text-xl text-gray-600 my-3">{data.description}</p>
              <p className="text-2xl font-bold text-green-600 mb-4">
                ${data.price}
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Category: {data.category.name}
              </p>

              {/* Product Ratings */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="text-gray-500">(100 reviews)</span>
              </div>

              {/* Additional Offers Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Additional Offers
                </h3>


                <div className="space-y-4 flex gap-6">


                  <div className="items-center border-2 rounded py-5 px-3 shadow-lg h-32">
                    <span className="text-green-600 flex items-center justify-center ">
                      <img src={deliverypng} className="h-15 w-12"/>
                    </span>
                    <span className="text-gray-600">
                      Free Home Delivery
                    </span>
                  </div>


                  <div className=" items-center border-2 rounded py-5 px-5 shadow-lg h-32">
                    <span className="text-red-600 flex items-center justify-center">
                      <img src={returnpng} className="h-15 w-12"/>
                    </span>
                    <span className="text-gray-600">
                      Free 30-Day Replacement
                    </span>
                  </div>


                  <div className=" items-center  border-2 rounded py-5 px-5 shadow-lg h-32">
                    <span className="text-yellow-500 flex items-center justify-center">

                      <img src={cashpng} className="h-16 w-14"/>
                    </span>
                    <span className="text-gray-600">
                      10% Bank Offer on HDFC Cards
                    </span>
                  </div>


                </div>
              </div>
              {/* Product Specifications */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Specifications:
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-gray-600">Weight: 1.5kg</li>
                  <li className="text-gray-600">
                    Dimensions: 12 x 10 x 6 inches
                  </li>
                  <li className="text-gray-600">Color: Black</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
                  Add to Cart
                </button>
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300">
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="mt-16">
              {/* Reviews Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Customer Reviews
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <span className="text-gray-600">(100 reviews)</span>
                </div>

                {/* Review Breakdown */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">5⭐:</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-500 h-2.5 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">4⭐:</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-400 h-2.5 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">3⭐:</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-300 h-2.5 rounded-full"
                        style={{ width: "10%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">2⭐</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-200 h-2.5 rounded-full"
                        style={{ width: "5%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">1⭐:</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-100 h-2.5 rounded-full"
                        style={{ width: "5%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Product Description
                </h3>
                <p className="text-lg text-gray-600">{data.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">
            No product details found.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default DetailProduct;
