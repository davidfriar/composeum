import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"
import external from "rollup-plugin-peer-deps-external"
import json from "@rollup/plugin-json"
import dts from "rollup-plugin-dts"
import postcss from "rollup-plugin-postcss"

const packageJson = require("./package.json")

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: "composeum-react",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      external(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      postcss({
        extract: false,
        modules: true,
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "es",
      },
    ],
    plugins: [dts()],
  },
]
