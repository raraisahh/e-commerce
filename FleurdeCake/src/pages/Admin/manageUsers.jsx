import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { MdDelete } from "react-icons/md";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await supabase.from("users").select("id, email, role");

            if (error) {
                console.error("Error fetching users:", error.message);
                Swal.fire("Error", "Failed to retrieve user list.", "error");
            } else {
                // Filter agar admin tidak muncul di daftar user
                const filteredUsers = data.filter(user => user.role !== "admin");
                setUsers(filteredUsers);
            }
        };

        fetchUsers();
    }, []);

    // Fungsi untuk menghapus user
    const deleteUser = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { error } = await supabase.from("users").delete().match({ id });

                if (error) {
                    Swal.fire("Error", "Failed to delete user: " + error.message, "error");
                } else {
                    Swal.fire("Deleted!", "User has been successfully deleted.", "success");
                    setUsers(users.filter(user => user.id !== id)); // Update state setelah hapus
                }
            }
        });
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main */}
            <div className="mx-16 mt-28 mb-14">
                <h1 className="text-3xl font-bold text-fleur-mauve mb-6">User List</h1>
                <div className="overflow-y-auto h-[500px] bg-white shadow-md rounded p-6">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id} className="border-b py-4 flex justify-between items-center">
                                <p className="text-lg font-semibold text-fleur-rose-gold">{user.email}</p>
                                <MdDelete 
                                    className="text-red-500 text-2xl cursor-pointer hover:text-red-700"
                                    onClick={() => deleteUser(user.id)}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No registered users.</p>
                    )}
                </div>

                {/* Back Button */}
                <div className="flex justify-center items-center mt-8">
                    <Link to="/admin-dashboard" className="flex items-center text-fleur-mauve font-medium text-lg hover:underline">
                        Back to Admin Dashboard
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ManageUsers;