import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/client";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user?.user) {
      navigate("/login");
      return;
    }

    const userId = user.user.id;

    const { error: cartError } = await supabase.from("cart").insert([
      {
        user_id: userId,
        product_id: product.id,
        quantity: 1,
      },
    ]);

    if (cartError) {
      console.error("Error adding to cart:", cartError.message);
      Swal.fire("Error", "Failed to add product to cart.", "error");
    } else {
      Swal.fire("Success!", `${product.name} added to cart!`, "success");
      navigate("/cart");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition relative">
      <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="text-lg font-semibold text-fleur-mauve mt-2">{product.name}</h3>
      <p className="text-gray-600">Rp {product.price.toLocaleString()}</p>

      <button 
        onClick={handleAddToCart} 
        className="mt-2 bg-fleur-mauve text-white px-4 py-2 rounded-lg hover:bg-fleur-rose-gold transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;