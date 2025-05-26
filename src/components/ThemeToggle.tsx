// src/components/ThemeToggle.tsx

"use client";

import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (!storedTheme) {
        storedTheme = "light";
        localStorage.setItem("theme", storedTheme);
      }
      setTheme(storedTheme);
      applyTheme(storedTheme);
    }
  }, []);

  const applyTheme = (mode: "light" | "dark") => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 bg-gray-700 dark:bg-yellow-500 text-white dark:text-black px-3 py-1 rounded hover:opacity-90 text-sm font-semibold shadow transition"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
