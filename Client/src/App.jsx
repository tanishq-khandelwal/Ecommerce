import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <>
      <div>
        {/* <p> Ecommerce Application</p> */}
        <Routes>
          
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<ProductsPage/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
