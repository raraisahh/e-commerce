import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import gallery1 from "../../assets/gallery1.jpg";
import gallery2 from "../../assets/gallery2.jpg";
import gallery3 from "../../assets/gallery3.jpg";
import gallery4 from "../../assets/gallery4.jpg";
import gallery5 from "../../assets/gallery5.jpg";
import gallery6 from "../../assets/gallery6.jpg";
import gallery7 from "../../assets/gallery7.jpg";
import gallery8 from "../../assets/gallery8.jpg";
import gallery9 from "../../assets/gallery9.jpg";
import gallery10 from "../../assets/gallery10.jpg";
import gallery11 from "../../assets/gallery11.jpg";
import gallery12 from "../../assets/gallery12.jpg";
import gallery13 from "../../assets/gallery13.jpg";
import gallery14 from "../../assets/gallery14.jpg";
import gallery15 from "../../assets/gallery15.jpg";
import gallery16 from "../../assets/gallery16.jpg";
import gallery17 from "../../assets/gallery17.jpg";
import gallery18 from "../../assets/gallery18.jpg";
import gallery19 from "../../assets/gallery19.jpg";
import gallery20 from "../../assets/gallery20.jpg";

const galleryImages = [
    gallery1, gallery2, gallery3, gallery4, gallery5, 
    gallery6, gallery7, gallery8, gallery9, gallery10, 
    gallery11, gallery12, gallery13, gallery14, gallery15, 
    gallery16, gallery17, gallery18, gallery19, gallery20
];

const Gallery = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-fleur-blush to-fleur-mauve text-white pt-48 pb-24 px-6 text-center">
                <h1 className="text-5xl font-bold drop-shadow-lg">Our Exquisite Cake Collection</h1>
                <p className="text-lg mt-4">
                    Indulge in the artistry of our handcrafted cakes, perfect for any occasion.
                </p>
            </div>

            {/* Gallery Section */}
            <div className="container mx-auto py-16 px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                            <img 
                                src={image} 
                                alt={`Cake ${index + 1}`} 
                                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold"></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Gallery;