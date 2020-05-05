import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Supplier from '@/components/supplier/Supplier'
import AddSupplier from '@/components/supplier/AddSupplier'
import EditSupplier from '@/components/supplier/EditSupplier'
import Login from '@/components/Login'

//插件都是通过use来调用，安装插件
Vue.use(Router)

//创建路由对象，export导出对象
const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
    },
    {
      path: '/home',
      name: 'home',
      component:Home,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/supplier',
          name: 'Supplier',
          component: Supplier
        },
        {
          path: '/addsupplier',
          name: 'AddSupplier',
          component: AddSupplier
        },
        {
          path: '/editSupplier',
          name: 'EditSupplier',
          component: EditSupplier
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/**',
      redirect:'/login'
    }
  ]
})

//路由守卫
router.beforeEach((to, from, next) => { // 路由跳转前监控(保证登录状态)
  // 重登陆删除本地数据
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  // 登录验证：如果本地没有储存用户且不在登录页面则跳转
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
