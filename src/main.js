import Vue from 'vue'
import App from './App.vue'

//导入我们使用的element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

//导入axios 来发送请求
import vueAxios from  "./lib/vue-axios"
Vue.use(vueAxios)
//导入基本样式
import "./assets/base.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
