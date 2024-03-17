import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve("./src"),
        },
    },

    base: "./",
    build: {
        outDir: "./dist",
        // sourcemap: true,

    },
    server: {
        port: 3100
    }
})
