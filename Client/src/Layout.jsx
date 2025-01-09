import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}<Footer/></main>
    </>
  );
};

export default Layout;
