import { FaMobileAlt } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { RiBrushAiFill } from "react-icons/ri";
import { FaBasketball, FaShirt } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";

const Categories = () => {
  return (
    <section className="px-10 py-16 ">
      <div>
        <h2 className="text-4xl font-sans text-center font-bold mb-2">
          Featured Categories
        </h2>
        <h4 className="text-xl font-sans text-center font-medium mb-10 text-[#4A5463]">
          Browse our most popular categories
        </h4>
      </div>

      <div className="flex flex-wrap justify-between sm:flex-col md:flex-row">
        <button className="px-14 py-10  border-2 rounded-lg shadow-lg hover:shadow-2xl">
          <div className="flex justify-center items-center mb-4">
            <div className="rounded-full bg-[#DBEBFF] h-14 w-14 flex justify-center items-center">
              <FaMobileAlt className="text-[#2463EA] h-10" />
            </div>
          </div>

          <div>
            <span className="flex mb-1 font-medium font-sans text-lg">
              Electronics
            </span>
            <span className="flex text-sm items-center justify-center text-[#4A5463]">
              20% off
            </span>
          </div>
        </button>

        <button className="px-14 py-10 border-2 rounded-lg shadow-lg hover:shadow-2xl">
          <div className="flex justify-center items-center mb-4">
            <div className="rounded-full bg-[#FCE6F2] h-14 w-14 flex justify-center items-center">
              <FaTshirt style={{ height: '2rem', width: '2rem' }} className="text-[#DA2677]  inline-block h-24" />
            </div>
          </div>

          <div>
            <span className="flex mb-1 font-medium font-sans text-lg items-center justify-center">
              Fashion
            </span>
            <span className="flex text-sm items-center justify-center text-[#4A5463]">
              New Arrivals
            </span>
          </div>
        </button>

        <button className="px-14 py-10 border-2 rounded-lg shadow-lg hover:shadow-2xl">
          <div className="flex justify-center items-center mb-4">
            <div className="rounded-full bg-[#DDFCE6] h-14 w-14 flex justify-center items-center">
              <MdHomeFilled style={{ height: '2rem', width: '2rem' }} className="text-[#16A34A]" />
            </div>
          </div>

          <div>
            <span className="flex mb-1 font-medium font-sans text-lg items-center justify-center">
              Home
            </span>
            <span className="flex text-sm items-center justify-center text-[#4A5463]">
              Upto 30% off
            </span>
          </div>
        </button>

        <button className="px-14 py-10 border-2 rounded-lg shadow-lg hover:shadow-2xl">
          <div className="flex justify-center items-center mb-4">
            <div className="rounded-full bg-[#F3E8FF] h-14 w-14 flex justify-center items-center">
              <RiBrushAiFill style={{ height: '1.5rem', width: '1.5rem' }} className="text-[#9332EB]" />
            </div>
          </div>

          <div>
            <span className="flex mb-1 font-medium font-sans text-lg">
              Beauty
            </span>
            <span className="flex text-sm items-center justify-center text-[#4A5463]">
              Free Gifts
            </span>
          </div>
        </button>

        <button className="px-14 py-10 border-2 rounded-lg shadow-lg hover:shadow-2xl">
          <div className="flex justify-center items-center mb-4">
            <div className="rounded-full bg-[#FEE2E2] h-14 w-14 flex justify-center items-center">
              <FaBasketball style={{ height: '1.5rem', width: '1.5rem' }} className="text-[#DD2726]" />
            </div>
          </div>

          <div>
            <span className="flex mb-1 font-medium font-sans text-lg">
              Sports
            </span>
            <span className="flex text-sm items-center justify-center text-[#4A5463]">
              15% off
            </span>
          </div>
        </button>
        <button className="px-14 py-10 border-2 rounded-lg shadow-lg hover:shadow-2xl">
          <div className="flex justify-center items-center mb-4">
            <div className="rounded-full bg-[#FFF9C2] h-14 w-14 flex justify-center items-center">
              <GiNotebook style={{ height: '1.5rem', width: '1.5rem' }}  className="text-[#CB8A05]" />
            </div>
          </div>

          <div>
            <span className="flex mb-1 font-medium font-sans text-lg items-center justify-center">
              Books
            </span>
            <span className="flex text-sm items-center justify-center text-[#4A5463]">
              Buy 2 Get 1
            </span>
          </div>
        </button>
      </div>

      <div className="flex justify-center items-center py-10">
        <button className="ml-auto flex items-center justify-center mr-auto w-auto px-8 py-3 bg-[#1E55DE] text-white rounded-full hover:bg-blue-600 font-sans font-semibold text-xl">
          View All Categories <span className="ml-2 text-4xl">&#8594;</span>
        </button>
      </div>
    </section>
  );
};

export default Categories;
