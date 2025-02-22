/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fleur-blush': '#FADADD', // Blush Pink (Lembut & feminin)
        'fleur-cream': '#FFF8E7', // Ivory/Cream (Netral & elegan)
        'fleur-lavender': '#E6E6FA', // Lavender/Lilac (Premium & manis)
        'fleur-rose-gold': '#B76E79', // Rose Gold (Sentuhan mewah)
        'fleur-grey': '#D3D3D3', // Soft Grey (Modern & netral)
        'fleur-mauve': '#915F6D', // Deep Mauve (Kontras untuk teks)
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  }
}