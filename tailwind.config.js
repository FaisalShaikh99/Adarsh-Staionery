/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#AC95B2', //lite purple
        accent: ' #301934',  //dark purple
        background: '#F5F5F5', //lite gray  
        text: '#333333', //very dark gray
      },
    },
  },
  plugins: [],
}
