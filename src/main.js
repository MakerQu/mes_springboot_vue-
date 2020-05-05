// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//导入的文件夹会自动找index
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(router)

Vue.prototype.$axios=Axios
Vue.prototype.HOST="/api"

// //配置请求头：这里使用axios，所以在axios的配置文件中添加：
// Axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem('Authorization')) {
//       config.headers.Authorization = localStorage.getItem('Authorization');
//     }
//
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });
//
// //http response 拦截器
// Axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       console.log(this);
//       Vue.$store.commit("logout");
//       Vue.$router.push({ path: "/login" });
//     }
//     return Promise.reject(error.response.data)
//   });


// 创建axios实例
var instance = Axios.create({    timeout: 1000 * 12});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store.state.user.token;
    token && (config.headers.common['token']  = token);
    return config;
  },
  error => Promise.error(error))

/* eslint-disable no-new */
new Vue({
  el: '#app',  //挂载到 index.html里的id=app
  router,
  store:store,
  components: { App }, //引入模块
  template: '<App/>'
})

