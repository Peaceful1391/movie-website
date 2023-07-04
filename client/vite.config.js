import path from "path";
import { fileURLToPath } from "url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command, mode, ssrBuild }) => {
  let outDir = `dist`;

  let entryClient = path.join(__dirname, "src/entry-client.jsx");
  let entryServer = path.join(__dirname, "src/entry-server.jsx");

  let entry = entryClient;

  if (ssrBuild) {
    outDir = `dist-ssr`;
    entry = entryServer;
  }

  const config = {
    build: {
      manifest: true,
      rollupOptions: {
        output: {
          dir: outDir,
        },
        input: {
          index: entry,
        },
      },
    },
    plugins: [react()],
  };

  return config;
});
