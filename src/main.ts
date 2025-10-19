import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { originI18n } from './i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(originI18n)

app.mount('#app')
