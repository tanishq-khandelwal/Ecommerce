import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Wireless/akull/JanART25/PEA_Event/PC_Hero_3000x1200_Asin._CB552651757_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/Symbol/2025/JanART/GW/Hero/event/unrec/2-1._CB552931194_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img22/WLA/2025/JanART/Uber/Gateway/Event/D197029535__WLA_JanART_GatewayPC_Hero_3000x1200_Lifestyle_4._CB552673282_.jpg",
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const navigate=useNavigate();

  return (
    <section
      className="relative bg-cover bg-center h-[500px]"
      style={{ backgroundImage: `url(${images[currentImageIndex]})`,
      backgroundSize: "cover", // Ensure the image covers the area
      backgroundPosition: "top 15% center", 
      transition: "background-image 1s ease-in-out",}}
    >
      <div className="absolute inset-0 "></div>
      <div className="relative z-10 text-left text-[#3934a1b7] py-44 ml-6">
        <h1 className="text-6xl font-bold mb-4">
          <span className="block font-sans">New Season</span>
          <span className="block font-sans">Arrivals</span>
        </h1>

        <p className="text-xl mb-6 font-sans text-[#0000008a]">
          Check out this season's latest trends and styles with up to 40% off on
          selected items.
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-white text-[#1E4197] rounded-full text-lg" onClick={()=>{
            navigate('/products')
          }}>
            Shop Now
          </button>
          <button className="px-8 py-3 bg-[#1E4197] text-white rounded-full text-lg hover:bg-white hover:text-[#1E4197] border-2  border-[#1E4197]">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
