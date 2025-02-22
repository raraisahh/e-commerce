import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Visitor/home";
import Menu from "../pages/Visitor/menu";
import About from "../pages/Visitor/about";
import Gallery from "../pages/Visitor/gallery";
import Login from "../pages/Auth/login";
import SignUp from "../pages/Auth/signUp";
import Logout from "../pages/Auth/logOut";
import Cart from "../pages/User/cart";
import Checkout from "../pages/User/checkOut";
import MyOrders from "../pages/User/myOrders";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageProducts from "../pages/Admin/manageProduct";
import ManageUser from "../pages/Admin/manageUsers";
import PrivateRouting from "./privateRouting";
import NotFound from "../pages/NotFound/notFound";

const Routing = () => {
  return (
    <Routes>
      {/* Halaman yang bisa diakses visitor */}
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<Logout />} />

      {/* Halaman yang hanya bisa diakses setelah login (User) */}
      <Route element={<PrivateRouting adminOnly={false} />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Route>

      {/* Halaman yang hanya bisa diakses oleh Admin */}
      <Route element={<PrivateRouting adminOnly={true} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-products" element={<ManageProducts />} />
        <Route path="/admin/manage-users" element={<ManageUser />} />
      </Route>

      {/* Halaman 404 jika rute tidak ditemukan */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;