import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/client";
import Swal from "sweetalert2";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            // Hapus sesi dari Supabase
            const { error } = await supabase.auth.signOut();

            if (error) {
                Swal.fire("Error", "Failed to log out: " + error.message, "error");
            } else {
                // Hapus token & role dari localStorage
                localStorage.removeItem("token");
                localStorage.removeItem("isAdmin");

                Swal.fire({
                    icon: "success",
                    title: "Logged out!",
                    text: "You have been logged out successfully.",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate("/login"); // Redirect ke halaman login
                });
            }
        };

        logoutUser();
    }, [navigate]);

    return null; // Tidak perlu render UI
};

export default Logout;