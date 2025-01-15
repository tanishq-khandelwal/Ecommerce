import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {Toaster} from "react-hot-toast"
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster/>
    </Provider>
  </StrictMode>
);
