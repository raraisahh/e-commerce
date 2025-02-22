import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", image_url: "" });
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Ambil daftar produk dari Supabase
    const fetchProducts = async () => {
        const { data, error } = await supabase.from("products").select("*");
        if (error) {
            console.error("Error fetching products:", error.message);
            Swal.fire("Error", "Failed to fetch products.", "error");
        } else {
            setProducts(data);
        }
    };

    // Menangani perubahan input form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Menambahkan produk baru
    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!form.name || !form.price || !form.image_url) {
            Swal.fire("Warning", "Please fill in all fields.", "warning");
            return;
        }

        const { error } = await supabase.from("products").insert([form]);

        if (error) {
            console.error("Error adding product:", error.message);
            Swal.fire("Error", "Failed to add product.", "error");
        } else {
            Swal.fire("Success", "Product added successfully!", "success");
            fetchProducts();
            setForm({ name: "", price: "", image_url: "" });
        }
    };

    // Menangani klik tombol edit
    const handleEditClick = (product) => {
        setEditingProduct(product);
        setForm({ name: product.name, price: product.price, image_url: product.image_url });
    };

    // Memperbarui produk
    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        if (!form.name || !form.price || !form.image_url) {
            Swal.fire("Warning", "Please fill in all fields.", "warning");
            return;
        }

        const { error } = await supabase
            .from("products")
            .update({
                name: form.name,
                price: form.price,
                image_url: form.image_url
            })
            .eq("id", editingProduct.id);

        if (error) {
            console.error("Error updating product:", error.message);
            Swal.fire("Error", "Failed to update product.", "error");
        } else {
            Swal.fire("Success", "Product updated successfully!", "success");
            fetchProducts(); // **Ambil ulang daftar produk setelah update**
            setEditingProduct(null);
            setForm({ name: "", price: "", image_url: "" });
        }
    };


    // Menghapus produk
    const handleDeleteProduct = async (id) => {
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "This product will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (confirmDelete.isConfirmed) {
            const { error } = await supabase.from("products").delete().eq("id", id);

            if (error) {
                console.error("Error deleting product:", error.message);
                Swal.fire("Error", "Failed to delete product.", "error");
            } else {
                Swal.fire("Deleted!", "Product has been deleted.", "success");
                fetchProducts();
            }
        }
    };

    return (
    <>
    <Navbar />
        <div className="container px-16 mt-20 mb-10 p-6 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-fleur-mauve text-center pb-4">Manage Products</h2>

            {/* Form Tambah/Edit Produk */}
            <div className="bg-fleur-blush p-6 rounded-lg mt-6">
                <h3 className="text-md font-semibold text-fleur-dark mb-4">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
                    <label className="block text-fleur-mauve font-semibold text-sm mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-[6px] text-sm border rounded-md focus:ring-fleur-mauve"
                        required
                    />

                    <label className="block text-fleur-mauve font-semibold mt-4 text-sm mb-2">Price (Rp)</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full p-[6px] text-sm border rounded-md focus:ring-fleur-mauve"
                        required
                    />

                    <label className="block text-fleur-mauve font-semibold mt-4 text-sm mb-2">Image URL</label>
                    <input
                        type="text"
                        name="image_url"
                        value={form.image_url}
                        onChange={handleChange}
                        className="w-full p-[6px] text-sm border rounded-md focus:ring-fleur-mauve"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-fleur-mauve text-white px-6 py-2 rounded-lg mt-4 hover:bg-fleur-rose-gold transition"
                    >
                        {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                </form>
            </div>

            {/* Daftar Produk */}
            <h3 className="text-2xl font-semibold text-fleur-dark mt-10">Product List</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg shadow-md">
                        <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded-md" />
                        <h4 className="text-lg font-semibold text-fleur-mauve mt-2">{product.name}</h4>
                        <p className="text-gray-600">Rp {product.price.toLocaleString()}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleEditClick(product)}
                                className="bg-yellow-400 text-white px-3 py-1 rounded-md"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    <Footer />
    </>
    );
};

export default ManageProducts;