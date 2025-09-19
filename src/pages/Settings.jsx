import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Settings() {
  // States
  const [theme, setTheme] = useState("light");
  const [animation, setAnimation] = useState("flip");
  const [fontSize, setFontSize] = useState("medium");

  // Load saved settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedAnimation = localStorage.getItem("animation");
    const savedFontSize = localStorage.getItem("fontSize");

    if (savedTheme) setTheme(savedTheme);
    if (savedAnimation) setAnimation(savedAnimation);
    if (savedFontSize) setFontSize(savedFontSize);

    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("animation", animation);
    localStorage.setItem("fontSize", fontSize);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, animation, fontSize]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen px-6 py-10 bg-gray-100 dark:bg-gray-900"
    >
      <div className="w-full max-w-lg p-8 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-white">
          Settings ⚙️
        </h2>

        {/* Theme Switch */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-4 py-2 text-gray-800 bg-gray-100 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none"
          >
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        {/* Animation Type */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Flashcard Animation
          </label>
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value)}
            className="w-full px-4 py-2 text-gray-800 bg-gray-100 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none"
          >
            <option value="flip">🔄 Flip</option>
            <option value="slide">➡️ Slide</option>
            <option value="fade">✨ Fade</option>
          </select>
        </div>

        {/* Font Size */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Font Size
          </label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full px-4 py-2 text-gray-800 bg-gray-100 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none"
          >
            <option value="small">🔹 Small</option>
            <option value="medium">🔸 Medium</option>
            <option value="large">🔶 Large</option>
          </select>
        </div>

        {/* Preview Section */}
        <div className="p-6 mt-8 text-center border rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          <p
            className={`${
              fontSize === "small"
                ? "text-sm"
                : fontSize === "medium"
                ? "text-lg"
                : "text-2xl"
            } text-gray-900 dark:text-gray-100`}
          >
            Preview Flashcard Text
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            (Animation: {animation}, Theme: {theme})
          </p>
        </div>
      </div>
    </motion.div>
  );
}
