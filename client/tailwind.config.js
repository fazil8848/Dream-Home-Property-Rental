/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...require('tailwindcss/colors'),
      'blue-100': '#1e1d85',
      'gray-900': 'rgba(0,0,0,0.35)',
      'indigo-750':'#6d6cb0',
      'white-100' : 'rgba(255, 255, 255, 0.4)'
    },
    backgroundImage: {
      'bannerImg': "url('https://res.cloudinary.com/dn6anfym7/image/upload/v1698482035/dreamHome/h4vnyiujlnurhzhjn98u.jpg')",
    },

    extend: {
      spacing: {
        '128': '85vh',
        '120': '65vw',
      },
        fontFamily: {
          'poppins': ['Poppins', 'sans-serif'], // Add 'Poppins' font family
        },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
