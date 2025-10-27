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
            navy: {
                  50: '#f0f4f8',
                  100: '#d9e2ec',
                  200: '#bcccdc',
                  300: '#9fb3c8',
                  400: '#829ab1',
                  500: '#627d98',
                  600: '#486581',
                  700: '#334e68',
                  800: '#243b53',
                  900: '#102a43',
        }
  }
    },
  },
  plugins: [],
}
