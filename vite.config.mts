
import dtsPlugin from "vite-plugin-dts";
import { defineConfig } from "vite";
import { join } from "path";

export default defineConfig({
    plugins: [ dtsPlugin({ rollupTypes: true }) ],
    build: {
        minify: false,
        target: "ESNext",
        rollupOptions: {
            external: [ "child_process", "vite" ],
        },
        lib: {
            entry: join(import.meta.dirname, "src/index.ts"),
            formats: [ "cjs", "es" ],
            fileName: "index"
        }
    }
});