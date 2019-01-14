import Vue from 'vue'
import App from './App.vue'

//导入我们使用的element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

//导入自己抽取的axios 来发送请求
import vueAxios from  "./lib/vue-axios"
Vue.use(vueAxios)
//导入基本样式
import "./assets/base.css"

//导入自己抽取的路由组件 同时将它挂载在vue的实例化中
import router from './lib/vue-router'

//导入自己抽取的面包屑导航
import mybreadCrumb from "./components/03-mybreadCrumb.vue";
//全局注册面包屑组件
Vue.component("mybreadCrumb",mybreadCrumb)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
