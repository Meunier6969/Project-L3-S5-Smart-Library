import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/router.js'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router)
app.mount('#app')
