import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import Logo from "../../assets/logo1.png";

const MyOrders = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data user dari Supabase Auth
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("❌ Error fetching user:", error.message);
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  // 🔹 Ambil daftar pesanan pengguna
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select(`
          id, total_price, payment_method, status, created_at,
          order_items (product_name, product_price, quantity)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Error fetching orders:", error.message);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  // 🔹 Fungsi untuk mengunduh struk sebagai PDF
  const handleDownloadPDF = (order) => {
    const doc = new jsPDF({ orientation: "landscape" });

    // **📌 Tambahkan Logo**
    const imgWidth = 100; 
    const imgHeight = 20; 
    doc.addImage(Logo, "PNG", 10, 10, imgWidth, imgHeight);

    // **📌 Detail Order**
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor("#915F6D"); // Warna fleur-rose-gold
    doc.text(`Order ID: ${order.id}`, 10, 50);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#333"); // Warna fleur-dark
    doc.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 10, 58);
    doc.text(`Payment Method: ${order.payment_method}`, 10, 66);
    doc.text(`Status: ${order.status}`, 10, 74);

    // **📌 Tambahkan Tabel Produk**
    const tableColumn = ["Product", "Quantity", "Price"];
    const tableRows = order.order_items.map((item) => [
      item.product_name,
      `${item.quantity}x`,
      `Rp ${item.product_price.toLocaleString()}`,
    ]);

    doc.autoTable({
      startY: 85, // 🔹 Dikurangi agar tabel lebih dekat dengan detail order
      margin: { top: 10 },
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: "#915F6D", textColor: "#fff" }, 
      alternateRowStyles: { fillColor: "#FADADD" }, 
      styles: { fontSize: 11, textColor: "#333" },
    });

    // **📌 Total Harga**
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(
      `Total: Rp ${order.total_price.toLocaleString()}`,
      10,
      doc.lastAutoTable.finalY + 8 // 🔹 Jarak total lebih dekat ke tabel
    );

    // Simpan PDF
    doc.save(`Order_${order.id}.pdf`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-20 mb-14 p-6 bg-white rounded-lg">
        <h2 className="text-3xl font-bold text-fleur-mauve text-center">My Orders</h2>

        {loading ? (
          <p className="text-center text-gray-600 mt-4">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">You have no orders yet.</p>
        ) : (
          <div className="mt-6 space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border p-4 rounded-lg shadow-md">
                {/* 🔹 Area Order */}
                <p className="text-lg font-semibold text-fleur-dark">Order ID: {order.id}</p>
                <p className="text-sm text-gray-500">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Payment: {order.payment_method}</p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span
                    className={`font-bold ml-2 ${
                      order.status === "Pending"
                        ? "text-yellow-500"
                        : order.status === "Completed"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                {/* 🔹 Daftar Produk yang Dipesan */}
                <div className="mt-4">
                  <p className="font-semibold text-fleur-mauve">Ordered Items:</p>
                  <ul className="list-disc list-inside">
                    {order.order_items?.length > 0 ? (
                      order.order_items.map((item, index) => (
                        <li key={index} className="text-gray-700">
                          {item.product_name} - {item.quantity}x Rp{" "}
                          {item.product_price?.toLocaleString()}
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No items found.</p>
                    )}
                  </ul>
                </div>

                <p className="text-right font-semibold text-fleur-dark mt-4">
                  Total: Rp {order.total_price?.toLocaleString()}
                </p>

                {/* 🔹 Tombol Download Struk PDF */}
                <button
                  onClick={() => handleDownloadPDF(order)}
                  className="mt-4 bg-fleur-mauve text-white px-4 py-2 rounded-lg hover:bg-fleur-rose-gold transition"
                >
                  Download Invoice
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;