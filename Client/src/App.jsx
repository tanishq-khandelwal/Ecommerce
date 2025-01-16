import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUp";
import DetailProduct from "./pages/DetailProduct";

function App() {
  return (
    <>
      <div>
        {/* <p> Ecommerce Application</p> */}
        <Routes>
          
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<ProductsPage/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path='/product' element={<DetailProduct/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
