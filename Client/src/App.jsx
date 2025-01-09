import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        {/* <p> Ecommerce Application</p> */}
        <Routes>
          
            <Route path="/" element={<Homepage />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
