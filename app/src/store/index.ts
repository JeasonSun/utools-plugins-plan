import { createStore } from 'vuex'
import type { App } from 'vue'

const store = createStore({
  modules: {}
})

export async function setupStore(app: App<Element>) {
  app.use(store)
}
export default store
