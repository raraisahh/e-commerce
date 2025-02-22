import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import heroImage from "../../assets/hero-cake.jpg"; 
import { MdShoppingCart, MdStar, MdCake, MdLocalShipping } from "react-icons/md";

const Home = () => {
    return (
        <div>
            {/* navbar */}
            <Navbar />

            {/* Hero Section */}
            <div 
                className="relative h-screen flex items-center bg-cover bg-center" 
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Text Content */}
                <div className="relative z-10 w-5/12 pl-40 text-fleur-cream">
                    <h1 className="text-6xl font-bold leading-tight">
                        Indulge in Elegance, <br /> One Bite at a Time
                    </h1>
                    <p className="text-lg mt-4">
                        Discover the finest selection of handcrafted cakes, made with love and the highest quality ingredients.
                    </p>
                    <Link to="/menu">
                        <button className="mt-6 bg-fleur-mauve text-white px-6 py-3 rounded-lg shadow-lg hover:bg-fleur-rose-gold transition duration-300">
                            Shop Now
                        </button>
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="container bg-fleur-cream mx-auto py-20 px-6 grid md:grid-cols-4 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <MdCake className="w-16 h-16 text-fleur-mauve" />
                    <h3 className="text-xl font-semibold text-fleur-dark">Premium Quality</h3>
                    <p className="text-gray-600">Made with the finest ingredients for an unforgettable taste.</p>
                </div>
                <div className="flex flex-col items-center">
                    <MdStar className="w-16 h-16 text-fleur-mauve" />
                    <h3 className="text-xl font-semibold text-fleur-dark">Top Rated</h3>
                    <p className="text-gray-600">Highly rated by thousands of happy customers.</p>
                </div>
                <div className="flex flex-col items-center">
                    <MdShoppingCart className="w-16 h-16 text-fleur-mauve" />
                    <h3 className="text-xl font-semibold text-fleur-dark">Easy Ordering</h3>
                    <p className="text-gray-600">Order online and get your favorite cake delivered to your door.</p>
                </div>
                <div className="flex flex-col items-center">
                    <MdLocalShipping className="w-16 h-16 text-fleur-mauve" />
                    <h3 className="text-xl font-semibold text-fleur-dark">Fast Delivery</h3>
                    <p className="text-gray-600">Guaranteed freshness with our express delivery service.</p>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-fleur-mauve py-16 px-6 text-center">
                <h2 className="text-3xl font-bold text-fleur-cream">What Our Customers Say</h2>
                <div className="mt-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                    <div className="bg-fleur-blush p-6 rounded-lg shadow-lg">
                        <p className="text-gray-600 italic">"Absolutely the best cake I've ever had! The flavors are so rich and delicious."</p>
                        <h4 className="text-fleur-mauve font-semibold mt-4">- Amelia, Jakarta</h4>
                    </div>
                    <div className="bg-fleur-blush p-6 rounded-lg shadow-lg">
                        <p className="text-gray-600 italic">"A truly luxurious experience. The cake was stunning and tasted amazing!"</p>
                        <h4 className="text-fleur-mauve font-semibold mt-4">- Daniel, Surabaya</h4>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 text-center bg-fleur-cream">
                <h2 className="text-4xl font-bold text-fleur-dark">Ready to Order?</h2>
                <p className="text-gray-600 mt-4">Browse our selection of handcrafted cakes and indulge in luxury.</p>
                <Link to="/gallery">
                    <button className="mt-6 bg-fleur-mauve text-white px-6 py-3 rounded-lg shadow-lg hover:bg-fleur-rose-gold transition duration-300">
                        Explore Cakes
                    </button>
                </Link>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
