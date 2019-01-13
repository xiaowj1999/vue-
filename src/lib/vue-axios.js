//抽取axios 作为vue的插件

//导入axios
import axios from "axios"
//设置请求的基地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
//暴露出去

export default  {
    install(Vue){
        Vue.prototype.$axios = axios
    }
}
