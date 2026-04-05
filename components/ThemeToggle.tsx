"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons/SocialIcons";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const button = document.getElementById("theme-toggle-btn");
    if (!button) return;

    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const vw = window.visualViewport?.width ?? window.innerWidth;
    const vh = window.visualViewport?.height ?? window.innerHeight;
    const maxRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));

    const applyTheme = () => {
      document.documentElement.classList.toggle("dark");
      const newIsDark = document.documentElement.classList.contains("dark");
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
      setIsDark(newIsDark);
    };

    if (typeof document.startViewTransition !== "function") {
      applyTheme();
      return;
    }

    const transition = document.startViewTransition(applyTheme);
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 400,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full border border-zinc-600 hover:border-zinc-400 hover:scale-110 transition-all duration-300 flex items-center justify-center fade-up delay-1"
    >
      {isDark ? (
        <MoonIcon className="w-4 h-4 text-gray-300" />
      ) : (
        <SunIcon className="w-4 h-4 text-gray-300" />
      )}
    </button>
  );
}
