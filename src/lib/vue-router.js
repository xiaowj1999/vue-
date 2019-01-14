//抽取所有关于组建路由部分

//导入路由
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//导入组件
import login from '../components/01-login.vue'
import index from '../components/02-index.vue'
import user from "../components/04-user.vue"

//写规则
let routes = [{
    path:"/login",
    component:login
},{
    path:"/",
    redirect:"/users"
},
{
    path:"/",
    component:index,
    children:[{
        path:"users",
        component:user
    }]
}]

//实例化路由对象
let router = new VueRouter({
    routes
})


// 注册导航守卫（回调函数）
router.beforeEach((to,from,next)=>{
    console.log(to);
    console.log(from);
    console.log(next);
    
    
    //注意 next方法如果不执行 就不会跳转
     next();
    if(to.path ==="/login"){
        //登录页 不需要判断
        next()
    }else {
        //判断登录 判断token是否存在即可
        let token = window.sessionStorage.getItem("token");
        if(token){
            //说明登录成功 继续访问
            next()
        }else {
            //这里token没有登录
            //这里不是Vue实例 无法通过this访问 但是可以访问到Vue构造函数 可以通过原型访问
            Vue.prototype.$message.error("请先进行登录");
            next("/login")

        }
    }
})

//暴露出去
export default router;