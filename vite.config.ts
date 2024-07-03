import { fileURLToPath, URL } from 'node:url';

import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';

let cdn = false;

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  if (env.VITE_APP_CDN === 'true' && command !== 'serve') {
    cdn = true;
  }

  return {
    base: '/window-ai/',
    plugins: [
      vue(),
      vueDevTools(),
      cdn &&
        importToCDN({
          prodUrl: '//unpkg.com/{name}@{version}/{path}',
          // enableInDevMode: true,
          modules: [
            'vue',
            {
              name: 'view-ui-plus',
              var: 'ViewUIPlus',
              path: `dist/viewuiplus.min.js`,
              css: ['dist/styles/viewuiplus.css']
            }
          ]
        })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true
    }
  };
});
