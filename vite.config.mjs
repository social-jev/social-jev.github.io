import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function serveDocsIndex(server) {
  server.middlewares.use((request, response, next) => {
    if (request.url === "/docs/") request.url = "/docs/index.html";
    next();
  });
}

export default defineConfig({
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [
    react(),
    {
      name: "docs-directory-index",
      configureServer: serveDocsIndex,
      configurePreviewServer: serveDocsIndex,
    },
  ],
});
