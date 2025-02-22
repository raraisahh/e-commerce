import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { MdSettings, MdAssignment, MdCheckCircle } from "react-icons/md";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
        fetchUsers();
    }, []);

    // 🔹 Ambil daftar order dari Supabase
    const fetchOrders = async () => {
        const { data, error } = await supabase
            .from("orders")
            .select("id, name, total_price, payment_method, status, created_at, order_items(product_name, quantity)")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching orders:", error.message);
            Swal.fire("Error", "Failed to fetch orders.", "error");
        } else {
            setOrders(data);
        }
    };

    // 🔹 Ambil daftar user dari Supabase
    const fetchUsers = async () => {
        const { data, error } = await supabase.from("users").select("id, email, role");

        if (error) {
            console.error("Error fetching users:", error.message);
            Swal.fire("Error", "Failed to fetch user list.", "error");
        } else {
            const filteredUsers = data.filter(user => user.role !== "admin");
            setUsers(filteredUsers);
        }
    };

    // 🔹 Fungsi untuk mengubah status order menjadi "Completed"
    const handleApproveOrder = async (orderId) => {
        const confirm = await Swal.fire({
            title: "Approve this order?",
            text: "Once approved, this order will be marked as completed.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, approve it!",
            cancelButtonText: "Cancel",
        });

        if (confirm.isConfirmed) {
            const { error } = await supabase
                .from("orders")
                .update({ status: "Completed" })
                .eq("id", orderId);

            if (error) {
                Swal.fire("Error", "Failed to approve order.", "error");
            } else {
                Swal.fire("Success", "Order has been approved!", "success");
                fetchOrders(); // Perbarui daftar order setelah perubahan status
            }
        }
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="mx-16 mt-28 mb-14">
                <div className="h-[560px] overflow-y-auto">
                    <h1 className="text-2xl font-bold text-fleur-mauve mb-6">Orders</h1>
                    <div className="overflow-y-auto h-[300px] bg-white shadow-md rounded p-6">
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <div key={order.id} className="border-b py-4">
                                    <p className="text-lg font-semibold text-fleur-mauve">Order ID: {order.id}</p>
                                    <p className="text-gray-600">Customer: {order.name}</p>
                                    <p className="text-gray-600">Total: Rp {order.total_price.toLocaleString()}</p>
                                    <p className="text-gray-600">Payment: {order.payment_method}</p>
                                    <p className={`font-semibold ${order.status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                                        Status: {order.status}
                                    </p>
                                    <p className="text-gray-600 mt-2 font-semibold">Items Ordered:</p>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {order.order_items.map((item, index) => (
                                            <li key={index}>{item.product_name} - {item.quantity}x</li>
                                        ))}
                                    </ul>

                                    {/* 🔹 Tombol Approve Order */}
                                    {order.status === "Pending" && (
                                        <button
                                            onClick={() => handleApproveOrder(order.id)}
                                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                        >
                                            <MdCheckCircle className="inline-block mr-2" />
                                            Approve Order
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600">No orders available.</p>
                        )}
                    </div>

                    {/* User List */}
                    <h1 className="text-2xl font-bold text-fleur-mauve mt-10 mb-6">Users</h1>
                    <div className="overflow-y-auto h-[200px] bg-white shadow-md rounded p-6">
                        {users.length > 0 ? (
                            users.map(user => (
                                <div key={user.id} className="border-b py-4">
                                    <p className="text-base font-semibold text-fleur-mauve">{user.email}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600">No registered users.</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center items-center mt-8 space-x-4">
                    <Link to="/admin/manage-products" className="flex items-center text-fleur-dark font-medium text-md hover:underline">
                        <MdAssignment className="text-fleur-mauve text-md mr-1" />
                        Manage Products
                    </Link>
                    <Link to="/admin/manage-users" className="flex items-center text-fleur-dark font-medium text-md hover:underline">
                        <MdSettings className="text-fleur-mauve text-md mr-1" />
                        Manage Users
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AdminDashboard;