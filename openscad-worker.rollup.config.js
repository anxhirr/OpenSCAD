import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import packageConfig from "./package.json";

const LOCAL_URL = process.env.LOCAL_URL ?? "http://localhost:4000/";
const PUBLIC_URL = process.env.PUBLIC_URL ?? packageConfig.homepage;

export default [
  {
    input: "src/runner/openscad-worker.ts",
    output: {
      file: "dist/openscad-worker.js",
      format: "es",
      sourcemap: process.env.NODE_ENV !== "production",
    },
    plugins: [
      typescript({
        rootDir: "src",
      }),
      replace({
        preventAssignment: true,
        "import.meta.url": JSON.stringify(
          process.env.NODE_ENV !== "production" ? LOCAL_URL : PUBLIC_URL
        ),
      }),
      process.env.NODE_ENV === "production" && terser(),
    ],
    onwarn(warning, warn) {
      if (warning.code === "CIRCULAR_DEPENDENCY") return;
      warn(warning);
    },
  },
];
