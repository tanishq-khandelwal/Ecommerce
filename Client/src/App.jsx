import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUp";
import DetailProduct from "./pages/DetailProduct";
import Cart from "./pages/Cart";
import UserProfile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import ThankYouPage from "./pages/SuccessPayment";
import MyOrders from "./pages/MyOrders";

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
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/profile" element={<UserProfile/>}></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path="/success" element={<ThankYouPage/>}></Route>
            <Route path="/myorders" element={<MyOrders/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
