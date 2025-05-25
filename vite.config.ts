import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
import { VitePWA } from 'vite-plugin-pwa'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    importToCDN({
      prodUrl: '//unpkg.com/{name}@{version}/{path}',
      // enableInDevMode: true,
      modules: [
        'vue',
        {
          name: 'markdown-it',
          var: 'markdownit',
          path: 'dist/markdown-it.min.js',
        },
        {
          name: 'highlight.js',
          var: 'hljs',
          path: '//lib.baomitu.com/highlight.js/11.7.0/highlight.min.js',
        },
        {
          name: 'vue-devui',
          var: 'VueDevui',
          path: `vue-devui.umd.js`,
          css: ['style.css'],
        },
      ],
    }),
    VitePWA({
      devOptions: {
        enabled: false,
      },
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      manifest: {
        description: 'Window AI',
        theme_color: '#DDE3E9',
        background_color: '#DDE3E9',
        icons: [
          //添加图标， 注意路径和图像像素正确
          {
            src: '512x.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      // workbox: {
      //   runtimeCaching: [
      //     // woff?1111 结尾要缓存
      //     {
      //       urlPattern: /.*woff\?\d+$/,
      //       handler: 'CacheFirst',
      //       options: {
      //         cacheName: 'font-cache',
      //         expiration: {
      //           maxEntries: 100,
      //           maxAgeSeconds: 60 * 60 * 24 * 365,
      //         },
      //       },
      //     },
      //   ],
      // },
    }),
  ],
  base: '/window-ai/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            console.log(id)

            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
})
