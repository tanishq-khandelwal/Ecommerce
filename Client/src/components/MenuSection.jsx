const MenuSection = () => {
  return (
    <header className="flex justify-between items-center px-10 py-2 bg-[#364150] shadow-lg text-white">
      <div className="flex items-center space-x-4">
        {/* <img src="https://via.placeholder.com/150x50" alt="logo" className="w-32" /> */}
        <nav className="space-x-6 text-lg font-semibold">
          <a href="#home" className="hover:text-[#c3c3c4]">
            Home
          </a>

            <a href='/products' className="hover:text-[#c3c3c4]">Products</a>
         
          <a href="#about" className="hover:text-[#c3c3c4]">
            About
          </a>
          <a href="#contact" className="hover:text-[#c3c3c4]">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default MenuSection;
