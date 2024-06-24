import { createRouter, createWebHistory } from "vue-router"
import Category from '../views/Category.vue'
import Content from '../views/Content.vue'

const routes = [
  { path: '/', component: Category },
  { path: '/categories/:pathMatch(.*)*', component: Content },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
