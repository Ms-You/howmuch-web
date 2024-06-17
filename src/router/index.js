import { createRouter, createWebHistory } from "vue-router"
import Content from '../views/Content.vue'
import DutchPay from '../views/DutchPay.vue'
import Drink from '../views/Drink.vue'
import Restaurant from '../views/Restaurant.vue'
import Grocery from '../views/Grocery.vue'

const routes = [
  { path: '/', component: Content },
  { path: '/dutch-pay', component: DutchPay },
  { path: '/drink', component: Drink },
  { path: '/restaurant', component: Restaurant },
  { path: '/grocery', component: Grocery },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
