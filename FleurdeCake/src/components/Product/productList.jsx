import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/client";
import ProductCard from "./productCard";
import { MdShoppingCart } from "react-icons/md";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(data);
    }
  };

  // Tambah ke cart dan simpan di localStorage
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
  };

  return (
    <div className="container mr-16 mt-28 mb-10">
      <div>
        <h2 className="text-3xl font-bold text-fleur-mauve text-center">Our Cakes</h2>
        {/* Icon Cart di pojok kanan atas */}
        <Link to="/cart" className="absolute right-5 top-32 text-fleur-mauve hover:text-fleur-rose-gold">
          <MdShoppingCart className="w-8 h-6" />
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;