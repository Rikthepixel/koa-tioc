import { defineConfig } from "tsup";

export default defineConfig({
  dts: true,
  clean: true,
  outDir: "./lib",
  target: "es2020",
  sourcemap: true,
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
});
