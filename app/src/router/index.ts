import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import Todo from '../views/Todo.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'todo',
    component: Todo
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export function setupRouter(app: App<Element>){
  app.use(router)
  //
  // createGuard(router);
}

export default router
