//抽取所有关于组建路由部分

//导入路由
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//导入组件
import login from '../components/01-login.vue'
import index from '../components/02-index.vue'
import user from "../components/04-user.vue"
import role from "../components/05-roles.vue"
import rights from '../components/06-rights.vue'
import goods from '../components/07-goods.vue'
import params from '../components/08-params.vue'
import reports from '../components/10-reports.vue'
import categories from '../components/09-category.vue'
import orders from '../components/11-orders.vue'
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
    },{
        path:"roles",
        component:role
    },{
        path:"rights",
        component:rights
    }
    ,{
        path:"goods",
        component:goods
    },{
        path:"params",
        component:params
    },{
        path:"reports",
        component:reports
    },{
        path:"categories",
        component:categories
    },{
        path:"orders",
        component:orders
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
    //  next();
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