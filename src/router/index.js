import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '../views/Goods.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'goods',
    component: Goods
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: () => import('../views/Evaluate.vue')
  },
  {
    path: '/marchant',
    name: 'marchant',
    component: () => import('../views/Merchant.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
