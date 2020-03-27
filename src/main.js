//Vue构造函数
import Vue from 'vue'
//App组件(以.vue结尾的文件都是组件)
import App from './App.vue'
//路由对象
import router from './router'
//vatnt-ui组件库
import Vant from 'vant';
//导入axios
import axios from 'axios';


//绑定到原型,加上之后就可以在组件中通过this.$axios来调用请求方法
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000";

//注册Vant插件，Vue.use都是注册插件
Vue.use(Vant);

//上线环境是否提示信息（忽略）
Vue.config.productionTip = false

//路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/user')
  {
    let userinfo=JSON.parse(localStorage.getItem('userInfo'))||{};
    if(userinfo.token)
    {
      next();
    }
    else
    {
      next('/login');
    }
  }else
  {
    next();
  }
})
//创建一个根实例
//.$mount('#app)相当于el配置，指定id为app的元素作为模板
new Vue({
  //路由对象
  router,
  //加载第一个子组件，最底层的组件，(写法是固定的)
  render: h => h(App)
}).$mount('#app')