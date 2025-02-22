import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/client";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  // Handler untuk mengubah state form ketika input berubah
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input kosong
    if (!form.email || !form.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email and password are required!",
      });
      return;
    }

    try {
      // Melakukan login dengan Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
        return;
      }

      if (data.user) {
        // Ambil role dari tabel users
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profileError || !profile) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to fetch user role.",
          });
          return;
        }

        // Simpan token & role di localStorage
        localStorage.setItem("token", data.session.access_token);
        localStorage.setItem("isAdmin", profile.role === "admin" ? "true" : "false");

        Swal.fire({
          icon: "success",
          title: profile.role === "admin" ? "Welcome Admin!" : "Success!",
          text: profile.role === "admin" ? "Redirecting to admin dashboard..." : "You have successfully logged in.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate(profile.role === "admin" ? "/admin-dashboard" : "/");
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fleur-blush py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-lg p-8">
        <div>
          <h2 className="mt-6 mb-8 text-center text-2xl font-extrabold text-fleur-mauve">
            Log in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <div>
            <button
              type="submit"
              className="group relative mt-6 w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-fleur-mauve hover:bg-fleur-rose-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fleur-rose-gold"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center">
          <span className="text-fleur-mauve mr-1">Do not have an account?</span>
          <Link to="/signup" className="text-fleur-mauve hover:text-fleur-rose-gold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;