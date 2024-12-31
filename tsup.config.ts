import {defineConfig, Options} from "tsup";

const defaultConfig: Options = {
  bundle: true,
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  platform: "browser",
  sourcemap: true,
  target: "es6",
};

export default defineConfig([
  {
    ...defaultConfig,
    format: "esm",
    outDir: "dist/esm",
    outExtension: () => ({ js: ".mjs" }),
  },
  {
    ...defaultConfig,
    format: "cjs",
    outDir: "dist/cjs",
    outExtension: () => ({ js: ".cjs" }),
  },
  {
    ...defaultConfig,
    dts: false,
    entry: {"browser-kvs": "src/index.ts"},
    format: "iife",
    globalName: "BrowserKvs",
    minify: false,
    outDir: "dist",
    outExtension: () => ({ js: ".js" }),
  },
]);
