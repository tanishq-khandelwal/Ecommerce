import Categories from "../components/Categories";
import HeroSection from "../components/HeroSection";
import MenuSection from "../components/MenuSection";
import ProductSection from "../components/ProductSection";
import Layout from "../Layout";

function Homepage() {
  return (
    <>
      {/* Hero Section Starts*/}
      <Layout>
        <div className="bg-gray-100">
          {/* Header Starts*/}
          <MenuSection />
          {/* Header Ends */}

          {/* Hero Section Starts */}
          <div>
            <HeroSection />
          </div>
          {/* Hero Section Ends */}

          {/* Categories Section Starts */}
          <Categories />
          {/* Categories Section Ends */}

          {/* Product Section Starts */}
          <diV>
            <ProductSection />
          </diV>
          {/* Product Section Ends */}

        </div>
      </Layout>

      {/* Hero Section Ends */}
    </>
  );
}

export default Homepage;
