import { createRouter, createWebHistory } from "vue-router"
import Content from '../views/Content.vue'

const routes = [
  { path: '/', component: Content },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
