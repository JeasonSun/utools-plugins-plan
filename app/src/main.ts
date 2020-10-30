import { createApp } from 'vue'

import router from './router'
import store from './store'
import './plugins'

import App from './App.vue'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
