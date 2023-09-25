import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), qwikReact()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    resolve: {
      // 别名配置
      alias: {
        '@media': path.join(__dirname, 'src/media')
      }
    }
  };
});
