import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Login")
  },
  {
    path: '/register',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Register")
  },
  {
    path: '/user',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/User"),
    meta: {
      goto: true
    }
  },
  {
    path: '/edit-profile',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/EditProfile"),
    meta: {
      goto: true
    }
  },
  {
    path: '/follow',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Follow"),
    meta: {
      goto: true
    }
  },
  {
    path: '/comment',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Comment"),
    meta: {
      goto: true
    }
  },
  {
    path: '/star',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Star"),
    meta: {
      goto: true
    }
  },
  {
    path: '/index',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Index"),
  },
  {
    path: '/category',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Category"),
  },
  {
    path: '/search',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Search"),
  },
  {
    path: '/post/:id',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Post"),
  },
  {
    path: '/video/:id',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Video"),
  },
  {
    path: '/post-comment/:id',
    //组件的懒加载
    //@表示src的别名
    component: () => import("@/views/Post-comment"),
  }

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router