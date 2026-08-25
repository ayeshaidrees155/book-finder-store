import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Ensure this is imported

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Ensure this is added here
  ],
});
