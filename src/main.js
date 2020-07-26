import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import md5 from 'js-md5';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$md5 = md5;
Vue.config.productionTip = false
Vue.prototype.$axios = axios  // 挂载在vue实例化对象上

axios.defaults.withCredentials = true
axios.defaults.baseURL="https://fzulyt.fun:7001/"
var instance = axios.create({
  baseURL:'https://fzulyt.fun:7001/',
  timeout:5000,
  headers:{"Content-Type":"multipart/form-data"},
  withCredentialsL:true
});
Vue.prototype.instance=instance;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
