<template>
  <div class="form-container">
    <div class="login-content">
      <h2>用户登录</h2>
        <el-form label-position="top" label-width="80px" :model="formData">
          <el-form-item label="用户名">
              <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input v-model="formData.password"></el-input>
          </el-form-item>
          <el-button type="success" class="el-login">登录</el-button>
        </el-form>
      </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
      formData:{
        username:"",
        password:""
      }
    }
  }
}
</script>

<style>
  .form-container{
    background-color:#324152;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .login-content{
    background-color:#ffffff;
    width:580px;
    padding:40px;
    box-sizing:border-box;
    border-radius:10px;
  }
  .el-login {
    width:100%;
  }
</style>
