const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[500px]"
      style={{ backgroundImage: "url(https://via.placeholder.com/1500)" }}
    >
      <div className="absolute inset-0 bg-[#1E4197]"></div>
      <div className="relative z-10 text-left text-white py-44 ml-6">
        <h1 className="text-6xl font-bold mb-4">
          <span className="block font-sans">New Season</span>
          <span className="block font-sans">Arrivals</span>
        </h1>

        <p className="text-xl mb-6 font-sans ">
          Check out this season's latest trends and styles with up to 40% off on
          selected items.
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-white text-[#1E4197] rounded-full text-lg">
            Shop Now
          </button>
          <button className="px-8 py-3 bg-[#1E4197] text-white rounded-full text-lg hover:bg-white hover:text-[#1E4197] border-2  border-white">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
