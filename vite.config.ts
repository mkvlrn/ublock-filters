import { fileURLToPath } from "node:url";
import baseConfig from "@mkvlrn/config/vite" with { type: "json" };
import { defineConfig, mergeConfig } from "vite-plus";

const testsDir = fileURLToPath(new URL("tests/", import.meta.url));

export default mergeConfig(
  baseConfig,
  defineConfig({
    resolve: {
      alias: {
        "$/": testsDir,
      },
    },
    test: {
      coverage: {
        exclude: ["tests/**"],
      },
    },
  }),
);
