import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import AddGood from '../views/AddGood.vue'
import AllGoods from '../views/AllGoods.vue'
import Order from '../views/Order.vue'
import GoodMsg from '../views/GoodMsg.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/addgood',
    component: AddGood
  },
  {
    path: '/allgoods',
    component: AllGoods
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/goodmsg',
    component: GoodMsg
  }
 
]

const router = new VueRouter({
  /*mode: 'history',*/
  base: process.env.BASE_URL,
  routes
})

export default router
