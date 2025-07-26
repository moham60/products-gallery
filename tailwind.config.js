/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";

export default {
  darkMode:"media",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // ← المهم لإدخال flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin, // ← إضافة البلجن
  ],
};
