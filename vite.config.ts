import { fileURLToPath, URL } from 'node:url';

import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';
import { VitePWA } from 'vite-plugin-pwa';

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
            },
            {
              name: 'markdown-it',
              var: 'markdownit',
              path: 'dist/markdown-it.min.js'
            },
            {
              name: 'highlight.js',
              var: 'hljs',
              path: '//lib.baomitu.com/highlight.js/11.7.0/highlight.min.js'
            },
            {
              name: 'clipboard',
              var: 'ClipboardJS',
              path: 'dist/clipboard.min.js'
            }
          ]
        }),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'inline',
        manifest: {
          theme_color: '#ffffff'
        },
        workbox: {
          runtimeCaching: [
            // woff2?v=3.0.0 结尾要缓存
            {
              urlPattern: /.*\.(woff2|woff)\?v=\d+\.\d+\.\d+$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'font-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                }
              }
            },
            // 设置html 联网时优先使用网络，离线时使用缓存
            {
              urlPattern: /.*\.html/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'html-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 7 * 24 * 60 * 60
                }
              }
            }
          ]
        }
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
