// src/components/ThemeToggle.tsx

"use client";

import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Always check window first for SSR safety
    if (typeof window !== "undefined") {
      let stored = localStorage.getItem("theme") as "light" | "dark" | null;

      if (!stored) {
        stored = "light";
        localStorage.setItem("theme", stored);
      }

      setTheme(stored);
      applyTheme(stored);
    }
  }, []);

  const applyTheme = (mode: "light" | "dark") => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
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
