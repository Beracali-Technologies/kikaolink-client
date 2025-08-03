/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'primary-blue': '#1D4ED8',      // A strong, confident blue
            'primary-blue-hover': '#1E40AF',// A darker shade for hover
            'accent-red': '#E11D48',         // A vibrant, modern red
            'light-bg': '#F0F9FF',          // "Cloud color" - very light blue/white
            'dark-text': '#111827',         // Rich black for text
            'light-text': '#6B7280',        // Gray for secondary text
  }
    },
  },
  plugins: [],
}
