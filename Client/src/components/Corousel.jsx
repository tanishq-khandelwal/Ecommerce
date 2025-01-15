import React, { useEffect, useState } from 'react';
import courouse1 from '../assets/corousel1.jpg';
import courouse2 from '../assets/4.jpg';
import courouse3 from '../assets/2.jpg';
import courouse4 from '../assets/3.jpg';
// import courouse5 from '../assets/corousel1.jpg';

const images = [
  { id: 1, src: 'https://images-eu.ssl-images-amazon.com/images/G/31/img24/Wireless/akull/JanART25/PEA_Event/PC_Hero_3000x1200_Asin._CB552651757_.jpg', alt: 'Slide 1' },
  { id: 2, src: 'https://images-eu.ssl-images-amazon.com/images/G/31/Symbol/2025/JanART/GW/Hero/event/unrec/2-1._CB552931194_.jpg', alt: 'Slide 2' },
  { id: 3, src: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/WLA/2025/JanART/Uber/Gateway/Event/D197029535__WLA_JanART_GatewayPC_Hero_3000x1200_Lifestyle_4._CB552673282_.jpg', alt: 'Slide 3' },

];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div id="default-carousel" className="relative w-full">
      <div className="relative h-[40rem] overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="block w-full h-full object-cover bg-center bg-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default Carousel;
