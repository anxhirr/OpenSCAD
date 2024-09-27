import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import { promises as fs } from "fs";
import path from "path";

const LOCAL_URL = process.env.LOCAL_URL ?? "http://172.27.21.59:3000/";
const PUBLIC_URL = process.env.PUBLIC_URL ?? "http://172.27.21.59:3000/";

export default [
  {
    input: "src/runner/openscad-worker.ts",
    output: {
      file: "dist/openscad-worker.js",
      format: "es",
      sourcemap: true,
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
      {
        name: "preserve-worker-files",
        buildStart: async () => {
          const distDir = path.resolve(__dirname, "dist");
          const workerFile = path.join(distDir, "openscad-worker.js");

          // Check if the worker files exist and log a message if they do
          try {
            await fs.access(workerFile);
            console.log("Worker files found, skipping overwrite.");
          } catch (err) {
            console.log("Worker files not found, they will be created.");
          }
        },
      },
    ],
    onwarn(warning, warn) {
      if (warning.code === "CIRCULAR_DEPENDENCY") return;
      warn(warning);
    },
  },
];
