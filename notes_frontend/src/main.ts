import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './stores/notes' // Import notes store so Pinia auto-registers it

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
