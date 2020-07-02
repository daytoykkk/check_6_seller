import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$axios = axios  // 挂载在vue实例化对象上

axios.defaults.withCredentials = true
axios.defaults.baseURL="http://111.230.173.74:7001/"
var instance = axios.create({
  baseURL:'http://111.230.173.74:7001/',
  timeout:5000,
  headers:{"Content-Type":"multipart/form-data"}
});
Vue.prototype.instance=instance;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
