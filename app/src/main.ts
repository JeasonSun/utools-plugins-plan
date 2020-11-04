import { createApp } from 'vue'

import router, { setupRouter } from './router'
import { setupStore } from './store'
import './plugins'

import App from './App.vue'
import { setupAntd } from './setup/ant-design-vue'

const app = createApp(App)

setupAntd(app)

setupRouter(app)

setupStore(app)


router.isReady().then(() => {
  app.mount('#app');
})


