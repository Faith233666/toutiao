import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Login")
  },
  {
    path: '/toast',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Toast")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router