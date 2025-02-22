import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo1.png";

const Navbar = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <div className="navbar bg-fleur-cream shadow-md px-5 fixed top-0 left-0 w-full z-50">
      <div className="navbar-start">
        {/* Dropdown Menu untuk Mobile */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
            {/* Menu untuk Visitor */}
            <li>
              <Link to="/" className={`${location.pathname === "/" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className={`${location.pathname === "/menu" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                Cakes
              </Link>
            </li>
            <li>
              <Link to="/about" className={`${location.pathname === "/about" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/gallery" className={`${location.pathname === "/gallery" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                Gallery
              </Link>
            </li>
            {/* Menu untuk User */}
            {isAuthenticated && !isAdmin && (
              <>
                <li>
                  <Link to="/cart" className={`${location.pathname === "/cart" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/checkout" className={`${location.pathname === "/checkout" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link to="/my-orders" className={`${location.pathname === "/my-orders" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                    My Orders
                  </Link>
                </li>
              </>
            )}
            {/* Menu untuk Admin */}
            {isAdmin && (
              <>
                <li>
                  <Link to="/admin-dashboard" className={`${location.pathname === "/admin-dashboard", "/admin/manage-products", "/admin/manage-users" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                    Admin Dashboard
                  </Link>
                </li>
                {/* <li>
                  <Link to="/admin/manage-products" className={`${location.pathname === "/admin/manage-products" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                    Manage Products
                  </Link>
                </li> */}
              </>
            )}
          </ul>
        </div>
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Fleur de Cake Logo" className="w-40" />
        </Link>
      </div>

      {/* Navbar Center untuk Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className={`${location.pathname === "/" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" className={`${location.pathname === "/menu" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
              Cakes
            </Link>
          </li>
          <li>
            <Link to="/about" className={`${location.pathname === "/about" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={`${location.pathname === "/gallery" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
              Gallery
            </Link>
          </li>
          {/* User Menu */}
          {isAuthenticated && !isAdmin && (
            <>
              <li>
                <Link to="/cart" className={`${location.pathname === "/cart" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className={`${location.pathname === "/checkout" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                  Checkout
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className={`${location.pathname === "/my-orders" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                  My Orders
                </Link>
              </li>
            </>
          )}
          {/* Admin Menu */}
          {isAdmin && (
            <>
              <li>
                <Link to="/admin-dashboard" className={`${location.pathname === "/admin-dashboard", "/admin/manage-products", "/admin/manage-users" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                  Admin Dashboard
                </Link>
              </li>
              {/* <li>
                <Link to="/admin/manage-products" className={`${location.pathname === "/admin/manage-products" ? "bg-fleur-mauve text-white" : "text-fleur-mauve hover:bg-fleur-mauve hover:text-white"}`}>
                  Manage Products
                </Link>
              </li> */}
            </>
          )}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {isAuthenticated ? (
          <Link to="/logout" className="btn bg-fleur-mauve text-white hover:bg-fleur-rose-gold">
            Log Out
          </Link>
        ) : (
          <Link to="/login" className="btn bg-fleur-mauve text-white hover:bg-fleur-rose-gold">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;