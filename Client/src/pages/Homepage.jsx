import { useDispatch } from "react-redux";
import Categories from "../components/Categories";
import HeroSection from "../components/HeroSection";
import MenuSection from "../components/MenuSection";
import ProductSection from "../components/ProductSection";
import Layout from "../Layout";
import { setCartFromLocalStorage } from "../redux/slices/cartSlice";
import { useEffect } from "react";

function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to load the cart from localStorage on app load or after login
    dispatch(setCartFromLocalStorage());
  }, [dispatch]);
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
          <div>
            <ProductSection />
          </div>
          {/* Product Section Ends */}
        </div>
      </Layout>

      {/* Hero Section Ends */}
    </>
  );
}

export default Homepage;
