<template>
    <div class="main-container">
       <el-container class="el-container">
            <el-header>
                <el-row>
                    <el-col :span="4" class="el-logo"><div class="grid-content bg-purple">
                        <img src="../assets/logo.png" />
                        </div></el-col>
                    <el-col :span="16" class="el-text"><div class="grid-content bg-purple-light">
                        电商管理后台
                        </div></el-col>
                    <el-col :span="4" class="el-btn"><div class="grid-content bg-purple">
                        <el-button @click="logout" type="success">退出</el-button>
                    </div></el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="201px">
                  <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu :index="index+''" v-for="(item, index) in menuList" :key="item.id">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item.authName}}</span>
                      </template>
                         <el-menu-item  v-for="(it, i) in item.children" :key="it.id" index="1-1">
                           <i class="el-icon-menu"></i>{{it.authName}}
                          </el-menu-item>
                    </el-submenu>
                  </el-menu>

                </el-aside>
                <!-- 中间部分主体 -->
                <el-main>
                  <!-- 嵌套路由匹配组件 -->
                  <router-view></router-view>

                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
  data(){
    return {
      level2:'用户管理',
      level3:'用户列表',
      menuList:[]
    }
  },
  created(){
      //在登录完成发送请求
      this.$axios.get("/menus").then(res=>{
        console.log(res);
        this.menuList = res.data.data
        
      })
  },
  methods: {
      logout() {
        this.$confirm('你真的要退出吗?', '提示', {
          confirmButtonText: '狠心退出',
          cancelButtonText: '再看看吧',
          type: 'warning'
        }).then(() => {
            window.sessionStorage.removeItem("token");
            this.$router.push("login")
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '你真好呢'
          });          
        });
      }
    
  },
  // 判断我是否登录过 就查看是否存在token，我们将代码写在beforcreate中
  // 表示当页面一打开就判断
  // beforeCreate() {
  //   //获取token的
  //   let token = window.sessionStorage.getItem("token");
  //   //判断token是否存在值
  //   if (token) {
  //     //登录成功
  //   } else {
  //     //如果不存在说明没有登录 从而提示用户去登录 打回登录页面
  //     this.$message.error("很抱歉，你还没有登录");

  //     this.$router.push("login");
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.main-container {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  .el-logo {
    text-align: left;
  }
  .el-text {
    font-size: 20px;
    font-weight: 700px;
    color: #fff;
  }
  .el-btn {
    text-align: right;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  li.el-submenu{
    text-align: left;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
  padding-top: 0px;
  .el-breadcrumb{
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    padding-left: 10px;
  }
}
</style>