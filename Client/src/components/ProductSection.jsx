import { Link } from "react-router-dom";

const ProductSection = () => {
  const Deals = [
    {
      id: 1,
      src: "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Wireless/debarsh/MSO/CC/Jan_ART/PC_CC_379x304._SY304_CB552809131_.jpg",
      deal: "Up to 40% | Deals on Mobiles and accessories",
    },
    {
      id: 2,
      src: "https://images-eu.ssl-images-amazon.com/images/G/31/img24hp/headphones/DEC_audio/PC_CC_379x304_llll._SY304_CB552721245_.jpg",
      deal: "Starting ₹349 | Bestselling headphones",
    },
    {
      id: 3,
      src: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Camera/Trueview/PC_CC_379x304_CEPC._SY304_CB552821024_.jpg",
      deal: "Up to 75% off | Electronics & accessories",
    },
  ];

  return (
    <section id="products" className="py-16 px-10">
      <h2 className="text-4xl font-bold text-left mb-3 font-sans">
        Deals of the Day
      </h2>
      <h2 className="text-xl text-left font-medium font-sans mb-12 text-[#4A5463]">
        Up to 40% off
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Deals.map(({ id, src, deal }) => (
          <div
            key={id}
            className="bg-white p-1 border rounded-lg shadow-lg hover:shadow-2xl transition"
          >
            <img
              src={src}
              alt={deal}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold">{deal}</h3>
              {/* <p className="text-gray-500">Exciting offers available</p> */}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center py-10">
        <Link to="/products">
          <button className="ml-auto flex items-center justify-center mr-auto w-auto px-8 py-3 bg-[#1E55DE] text-white rounded-full hover:bg-blue-600 font-sans font-semibold text-xl">
            View More Products <span className="ml-2 text-4xl">&#8594;</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ProductSection;
