import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import AddGood from '../views/AddGood.vue'
import AllGoods from '../views/AllGoods.vue'
import Order from '../views/Order.vue'
import GoodMsg from '../views/GoodMsg.vue'
import OrderMsg from '../views/OrderMsg.vue'

Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

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
  },
  {
    path: '/ordermsg',
    component: OrderMsg
  }
]

const router = new VueRouter({
  /*mode: 'history',*/
  base: process.env.BASE_URL,
  routes
})


export default router
