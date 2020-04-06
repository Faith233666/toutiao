//Vue构造函数
import Vue from 'vue'
//App组件(以.vue结尾的文件都是组件)
import App from './App.vue'
//路由对象
import router from './router'
//vatnt-ui组件库
import Vant, { Toast } from 'vant';
//导入axios
import axios from 'axios';

let app;
//绑定到原型,加上之后就可以在组件中通过this.$axios来调用请求方法
Vue.prototype.$axios = axios;

//本地地址
axios.defaults.baseURL = "http://127.0.0.1:3000";
//局域网服务器
// axios.defaults.baseURL = "http://192.168.0.106:3000";
//线上地址
// axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com";

//注册Vant插件，Vue.use是注册插件
Vue.use(Vant);

//上线环境是否提示信息（忽略）
Vue.config.productionTip = false

//路由守卫
//to表示去到哪个页面
//from表示来自哪个页面
//next 必须要调用,相当于Node.js中间件,调用了才会加载后面的内容
router.beforeEach((to, from, next) => {
  if (to.meta.goto) {
    let userinfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    if (userinfo.token) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})
//错误拦截
//github 地址https://github.com/axios/axios#interceptors
axios.interceptors.response.use(res => {
  return res;
}, error => {
  const{statusCode,message}=error.response.data;
  if(statusCode===400)
  {
    Toast.fail(message);
  }
  if(statusCode===403)
  {
    //app是Vue的实例对象，可以使用里面的this.$router.replace方法
    Toast.fail(message);
    // 跳转到登录页, push方法的参数除了可以直接写一个字符串还可以写一个对象
		// 对象里面的path属性表示路径，query表单问号的参数
    // 比如这完整的路径其实 /login?return_url=/posts/1
    app.$router.push({
      path:'/login',
      query:{
        return_url:app.$route.path
      }
    });
    return Promise.reject(error)
  }
});
//创建一个根实例
//.$mount('#app)相当于el配置，指定id为app的元素作为模板
app=new Vue({
  //路由对象
  router,
  //加载第一个子组件，最底层的组件，(写法是固定的)
  render: h => h(App)
}).$mount('#app')