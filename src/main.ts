import { createApp } from 'vue'
import App from './App.vue'

import '@devui-design/icons/icomoon/devui-icon.css'

import Icon from 'vue-devui/icon'
import 'vue-devui/icon/style.css'

const app = createApp(App)

app.use(Icon)

app.mount('#app')
