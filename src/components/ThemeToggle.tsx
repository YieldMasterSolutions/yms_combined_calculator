// src/components/ThemeToggle.tsx

"use client";

import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = stored || "light";
    setTheme(initial);
    applyTheme(initial);

    // Force 'light' theme if nothing set
    if (!stored) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const applyTheme = (mode: "light" | "dark") => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
