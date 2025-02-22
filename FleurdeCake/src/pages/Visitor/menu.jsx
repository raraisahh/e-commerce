import React from "react";
import ProductList from "../../components/Product/productList";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

const Menu = () => {
  return (
    <div>
      <Navbar />
      <ProductList />
      <Footer />
    </div>
  );
};

export default Menu;