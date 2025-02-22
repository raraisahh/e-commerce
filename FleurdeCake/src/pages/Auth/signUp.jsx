import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/client";
import Swal from "sweetalert2";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });

  // Handler untuk mengubah state form ketika input berubah
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input kosong
    if (!form.full_name || !form.email || !form.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    try {
      // Mendaftarkan user ke Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
        return;
      }

      if (data.user) {
        // Menentukan apakah user ini admin atau user biasa
        const role = form.email === "admin@fleurdecake.com" ? "admin" : "user";

        // Menyimpan user ke tabel `users`
        const { error: profileError } = await supabase.from("users").insert([
          { id: data.user.id, email: form.email, full_name: form.full_name, role: role },
        ]);

        if (profileError) {
          console.error("Error inserting profile:", profileError.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to save user profile.",
          });
          return;
        }

        // Tampilkan pesan sukses
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Check your email for verification link.",
          timer: 2000,
          showConfirmButton: false,
        });

        // Reset form setelah signup berhasil
        setForm({ full_name: "", email: "", password: "" });

        // Arahkan user ke halaman login setelah mendaftar
        navigate("/login");
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
            Sign Up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 opacity-70">
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 opacity-70">
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
              Sign Up
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center">
          <span className="text-fleur-mauve mr-1">Already have an account?</span>
          <Link to="/login" className="text-fleur-mauve hover:text-fleur-rose-gold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;