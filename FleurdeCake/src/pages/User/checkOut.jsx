import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../supabase/client";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", address: "", phone: "", paymentMethod: "Bank Transfer" });

  // 🔹 Ambil user dari Supabase Auth
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  // 🔹 Ambil data cart dengan informasi produk dari Supabase
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("cart")
        .select("id, product_id, quantity, products(id, name, price)")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching cart:", error.message);
      } else {
        setCart(
          data.map((item) => ({
            id: item.id,
            product_id: item.product_id,
            quantity: item.quantity || 1,
            product_name: item.products?.name || "Unknown Product",
            product_price: item.products?.price || 0,
          }))
        );
      }
    };

    fetchCart();
  }, [user]);

  // 🔹 Hitung total harga dengan aman
  const totalPrice = cart.reduce((sum, item) => sum + item.product_price * item.quantity, 0);

  // 🔹 Update state saat form diisi
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Fungsi Checkout
  const handleCheckout = async () => {
    if (!user) {
      Swal.fire("Error", "Please login before checking out.", "error");
      return;
    }

    if (!form.name || !form.address || !form.phone) {
      Swal.fire("Warning", "Please fill in all fields.", "warning");
      return;
    }

    if (cart.length === 0) {
      Swal.fire("Error", "Your cart is empty. Please add products first.", "error");
      return;
    }

    try {
      console.log("🛒 Checkout dengan cart:", cart); // Debugging

      // 🔹 Simpan order ke Supabase
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            name: form.name,
            address: form.address,
            phone: form.phone,
            total_price: totalPrice,
            payment_method: form.paymentMethod,
            status: "Pending",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      console.log("✅ Order berhasil disimpan:", orderData);

      // 🔹 Simpan setiap item ke `order_items`
      const orderItems = cart.map((item) => ({
        order_id: orderData.id,
        product_name: item.product_name,
        product_price: item.product_price,
        quantity: item.quantity,
      }));

      console.log("📦 Data order_items yang akan disimpan:", orderItems);

      const { error: orderItemsError } = await supabase.from("order_items").insert(orderItems);
      if (orderItemsError) throw orderItemsError;

      console.log("✅ Order items berhasil disimpan.");

      // 🔹 Hapus cart setelah checkout berhasil
      await supabase.from("cart").delete().eq("user_id", user.id); // Hapus dari Supabase
      setCart([]); // Update state agar tidak muncul di UI

      Swal.fire("Success", "Your order has been placed successfully!", "success").then(() => {
        window.location.href = "/my-orders"; // Redirect ke halaman My Orders
      });

    } catch (error) {
      Swal.fire("Error", `Failed to place order: ${error.message}`, "error");
    }
  };

  return (
  <>
    <Navbar />
    <div className="container mx-auto mt-20 mb-14 p-6 bg-white rounded-lg">
      <h2 className="text-3xl font-bold text-fleur-mauve text-center">Checkout</h2>

      {/* 🔹 Daftar Produk */}
      <div className="mt-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b py-4">
            <p className="text-lg text-fleur-mauve">{item.product_name}</p>
            <p className="text-gray-600">Qty: {item.quantity}</p>
            <p className="text-gray-600">Rp {(item.product_price * item.quantity).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* 🔹 Total Harga */}
      <div className="mt-4 text-right text-lg font-semibold text-fleur-dark">
        Total: Rp {totalPrice.toLocaleString()}
      </div>

      {/* 🔹 Formulir Checkout */}
      <div className="mt-6">
        <label className="block text-fleur-dark font-semibold">Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-fleur-mauve"
          required
        />

        <label className="block text-fleur-dark font-semibold mt-4">Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-fleur-mauve"
          required
        ></textarea>

        <label className="block text-fleur-dark font-semibold mt-4">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-fleur-mauve"
          required
        />

        <label className="block text-fleur-dark font-semibold mt-4">Payment Method</label>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-fleur-mauve"
        >
          <option>Bank Transfer</option>
          <option>Credit Card</option>
          <option>Cash on Delivery</option>
        </select>

        {/* 🔹 Tombol Checkout */}
        <button
          onClick={handleCheckout}
          className="w-full bg-fleur-mauve text-white px-6 py-2 rounded-lg mt-6 hover:bg-fleur-rose-gold transition"
        >
          Place Order
        </button>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default Checkout;