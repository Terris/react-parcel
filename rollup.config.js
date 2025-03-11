const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const { terser } = require("rollup-plugin-terser");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const dts = require("rollup-plugin-dts").default;
const packageJson = require("./package.json");

const config = [
  // JavaScript/TypeScript build
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
    external: ["react", "react-dom", "dompurify"],
  },
  // Next.js version
  {
    input: "src/next.ts",
    output: [
      {
        file: "dist/cjs/next.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/esm/next.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
    external: ["react", "react-dom", "dompurify"],
  },
  // Type declarations
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
  {
    input: "src/next.ts",
    output: [{ file: "dist/next.d.ts", format: "es" }],
    plugins: [dts()],
  },
  {
    input: "src/sanitizer/index.ts",
    output: [{ file: "dist/sanitizer/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

module.exports = config;
