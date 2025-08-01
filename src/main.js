import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import messagePlugin from './utils/message'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(messagePlugin)
  .mount('#app')



