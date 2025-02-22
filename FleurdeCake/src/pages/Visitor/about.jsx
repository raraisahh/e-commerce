import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import founderImage from "../../assets/founder.jpg"; // Gambar founder
import shopImage from "../../assets/shop.jpg"; // Gambar toko

const About = () => {
    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-fleur-blush to-fleur-mauve text-white pt-48 pb-24 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl text-fleur-cream font-bold drop-shadow-lg">Our Story</h1>
                    <p className="text-lg text-fleur-cream mt-4">A journey of passion, craftsmanship, and the finest cakes made with love.</p>
                </div>
            </div>

            {/* About Section */}
            <div className="container mx-auto py-20 px-6 max-w-5xl">
                <h2 className="text-3xl font-bold text-fleur-rose-gold text-center">Who We Are</h2>
                <p className="text-fleur-mauve text-center mt-4">
                    Fleur de Cake was founded with a simple dream: to bring joy and elegance through handcrafted cakes.  
                    Our mission is to craft the most exquisite cakes using premium ingredients, ensuring every bite is a delightful experience.
                </p>

                {/* Founder Story */}
                <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
                <img src={founderImage} alt="Founder" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
                    <div>
                        <h3 className="text-2xl font-semibold text-fleur-rose-gold">Meet Our Founder</h3>
                        <p className="text-fleur-mauve mt-2">
                            Inspired by the art of French pâtisserie, <strong>Marie Lemoine</strong> dedicated her life to creating cakes that  
                            are not only delicious but also works of art. With over 10 years of experience, she ensures that  
                            every cake tells a story of passion, elegance, and love.
                        </p>
                    </div>
                </div>

                {/* Our Store */}
                <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
                    <div>
                        <h3 className="text-2xl font-semibold text-fleur-rose-gold">Visit Our Store</h3>
                        <p className="text-fleur-mauve mt-2">
                            Located in the heart of the city, our boutique cake shop is a sanctuary for cake lovers.  
                            Come and experience our delightful creations firsthand!
                        </p>
                    </div>
                    <img src={shopImage} alt="Our Shop" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 text-center bg-fleur-cream">
                <h2 className="text-4xl font-bold text-fleur-rose-gold">Taste the Elegance</h2>
                <p className="text-fleur-mauve mt-4">Experience the finest cakes handcrafted with passion and perfection.</p>
                <Link to="/gallery">
                    <button className="mt-6 bg-fleur-mauve text-white px-6 py-3 rounded-lg shadow-lg hover:bg-fleur-rose-gold transition duration-300">
                        Explore Our Cakes
                    </button>
                </Link>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default About;