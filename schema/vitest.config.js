import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// gör så att Vitest använder jsdom och laddar ./vitest.setup.js

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./schema/vitest.setup.js", // Prova även utan ./schema/
  },
});
