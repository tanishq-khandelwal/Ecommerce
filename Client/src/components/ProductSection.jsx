import { Link } from "react-router-dom";

const ProductSection = () => {
  return (
    <section id="products" className="py-16 px-10">
      <h2 className="text-4xl font-bold text-left mb-3 font-sans">
        Popular Products
      </h2>
      <h2 className="text-xl  text-left font-medium font-sans mb-12 text-[#4A5463]">
        Discover our most loved products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((product) => (
          <div
            key={product}
            className="bg-white p-1 border rounded-lg shadow-lg hover:shadow-2xl transition"
          >
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Camera/Trueview/PC_CC_379x304_CEPC._SY304_CB552821024_.jpg"
              alt="product"
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold">Product {product}</h3>
              <p className="text-gray-500">Category</p>
              <p className="mt-2 text-lg font-semibold">$49.99</p>
              <button className="mt-4 w-full py-2 bg-[#1E55DE] text-white rounded-lg hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center py-10">

        <Link to={'/products'}>
        <button className="ml-auto flex items-center justify-center mr-auto w-auto px-8 py-3 bg-[#1E55DE] text-white rounded-full hover:bg-blue-600 font-sans font-semibold text-xl">
          View More Products <span className="ml-2 text-4xl">&#8594;</span>
        </button>
        </Link>
       
      </div>
    </section>
  );
};

export default ProductSection;
