// src/components/ThemeToggle.tsx

"use client";

import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="text-right mb-4">
      <button
        onClick={toggleTheme}
        className="text-sm px-4 py-1 border border-gray-400 rounded bg-white text-black dark:bg-black dark:text-white"
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default ThemeToggle;
