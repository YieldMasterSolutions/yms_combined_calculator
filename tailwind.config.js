// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,css,mdx}",
    "./public/**/*.html",
    "./out/**/*.html",
  ],
  safelist: [
    "text-yellow-300",
    "text-blue-400",
    "bg-zinc-800",
    "text-white",
    "border-gray-700",
    "grid-cols-2",
    "grid-cols-5",
    "rounded",
    "p-4",
    "mb-4",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
