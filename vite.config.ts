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
        devOptions: {
          enabled: true
        },
        registerType: 'autoUpdate',
        manifest: {
          description: 'Window AI',
          theme_color: '#000',
          background_color: '#000',
          icons: [
            //添加图标， 注意路径和图像像素正确
            {
              src: '512x.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
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
