// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  safelist: [
    // Typography and layout
    "text-yellow-300", "text-yellow-400", "text-blue-400", "text-blue-600", "text-green-700",
    "text-black", "text-white", "text-zinc-400", "text-zinc-100", "text-zinc-900",
    "bg-white", "bg-zinc-100", "bg-zinc-800", "bg-zinc-900",
    "dark:bg-zinc-800", "dark:bg-zinc-900", "dark:text-white",

    // Forms and cards
    "border", "border-gray-400", "border-zinc-300", "border-zinc-700",
    "rounded", "p-2", "p-4", "mb-1", "mb-4", "space-y-6",

    // Grid layouts
    "grid-cols-1", "grid-cols-2", "grid-cols-5",
    "grid", "flex", "justify-center", "text-center"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
