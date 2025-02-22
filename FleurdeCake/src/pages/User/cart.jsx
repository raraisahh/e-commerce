import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/client";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
      } else if (data?.user) {
        setUserId(data.user.id);
        fetchCart(data.user.id);
      }
    };

    fetchUser();
  }, []);

  // Ambil data cart dari Supabase
  const fetchCart = async (userId) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("cart")
      .select("id, product_id, quantity, products(name, price, image_url)")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching cart:", error.message);
    } else {
      setCart(data);
    }
  };

  // Hapus item dari cart di database
  const removeFromCart = async (id) => {
    const { error } = await supabase.from("cart").delete().eq("id", id);

    if (error) {
      console.error("Error removing item:", error.message);
      Swal.fire("Error", "Failed to remove item from cart.", "error");
    } else {
      setCart(cart.filter((item) => item.id !== id));
      Swal.fire("Success", "Item removed from cart.", "success");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-24 h-[680px] p-6 bg-white rounded-lg">
        <h2 className="text-3xl pb-8 font-bold text-fleur-mauve text-center shadow-lg">Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center h-[580px] text-gray-600 mt-4">Your cart is empty.</div>
        ) : (
          <div className="mt-6 px-24">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b-2 py-4">
                <img src={item.products.image_url} alt={item.products.name} className="w-16 h-16 rounded-lg" />
                <p className="text-lg text-fleur-mauve">{item.products.name}</p>
                <p className="text-gray-600">Rp {item.products.price.toLocaleString()}</p>
                <p className="text-gray-600">Qty: {item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tombol Checkout */}
        {cart.length > 0 && (
          <div className="mt-20 text-center">
            <Link
              to="/checkout"
              className="bg-fleur-mauve text-white px-6 py-2 rounded-lg hover:bg-fleur-rose-gold transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;