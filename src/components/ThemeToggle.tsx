// src/components/ThemeToggle.tsx

"use client";

import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = (localStorage.getItem("theme") as "light" | "dark") || "light";
      setTheme(stored);
      applyTheme(stored);
    }
  }, []);

  const applyTheme = (mode: "light" | "dark") => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
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
      className="fixed top-4 right-4 z-50 bg-blue-700 dark:bg-yellow-400 text-white dark:text-black px-4 py-1.5 rounded-lg text-sm font-[Montserrat] font-semibold shadow-md hover:opacity-90 transition"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
