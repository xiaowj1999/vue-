//抽取axios 作为vue的插件
//导入element UI 根据需求来导入
import { Message } from "element-ui"
//导入axios
import axios from "axios"
//设置请求的基地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
//暴露出去

//axios拦截器  请求发送之前 会触发这个回调函数
//修改请求的设置
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    //判断请求的是 登录 还是其他的url地址
    if(config.url.indexOf("/login") != -1){
        //登录接口
    }else {
        //非登录接口  在请求头设置token
        config.headers.Authorization = window.sessionStorage.getItem("token")
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  //响应式拦截
  // Add a response interceptor
axios.interceptors.response.use(function (response) {
    //根据响应的状态码 统一用户提示
    if(response.data.meta.status===200){
        //成功 提示返回的信息
        Message.success(response.data.meta.msg)

    }else if(response.data.meta.status === 400){
        //失败 提示返回的信息
        Message.error(response.data.meta.msg)
    }

    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });


export default  {
    install(Vue){
        Vue.prototype.$axios = axios
    }
}
