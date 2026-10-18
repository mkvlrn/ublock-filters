import { fileURLToPath } from "node:url";
import baseConfig from "@mkvlrn/config/vite" with { type: "json" };
import { defineConfig, mergeConfig } from "vite-plus";

export default mergeConfig(
  baseConfig,
  defineConfig({
    resolve: {
      alias: {
        "$/": fileURLToPath(new URL("tests/", import.meta.url)),
      },
    },
    test: {
      coverage: {
        exclude: ["tests/**", "infra/**"],
      },
    },
  }),
);
