import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRouting = ({ adminOnly = false }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminStatus = localStorage.getItem("isAdmin") === "true"; // Cek sebagai string "true"

    if (!token) {
      navigate("/login"); // Jika tidak login, arahkan ke login
    } else {
      setIsAuthenticated(true);
      setIsAdmin(adminStatus);

      if (adminOnly && !adminStatus) {
        navigate("/"); // Jika bukan admin, arahkan ke halaman utama
      }
    }
    
    setLoading(false);
  }, [navigate, adminOnly]);

  if (loading) return null; // Hindari flicker saat memeriksa status login

  return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRouting;