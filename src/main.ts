import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import ViewUIPlus from 'view-ui-plus';

console.log();

if (
  import.meta.env.VITE_APP_CDN !== 'true' ||
  (import.meta.env.VITE_APP_CDN === 'true' && import.meta.env.DEV)
) {
  import('view-ui-plus/dist/styles/viewuiplus.css');
}

createApp(App).use(ViewUIPlus).mount('#app');
