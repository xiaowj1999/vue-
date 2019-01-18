<template>
  <div class="form-container">
    <div class="login-content">
      <h2>用户登录</h2>
        <el-form label-position="top" :rules="rules" ref="formData" label-width="80px" :model="formData">
          <el-form-item label="用户名" prop="username">
              <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="formData.password"></el-input>
          </el-form-item>
          <el-button type="success"  @click="submitForm('formData')" class="el-login">登录</el-button>
        </el-form>
      </div>
  </div>
</template>

<script>

export default{ 

  data(){
    return {
      formData:{
        username:"",
        password:""
      },
       rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'change' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6 , message: '长度在6个字符以上', trigger: 'change' }
          ]
       }
    };
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            //发送请求 
            this.$axios.post("login",this.formData)
            .then(res=>{
                // alert("111")
                // console.log(res)
                if(res.data.meta.status ===200){
                  //说明用户名和密码验证成功
                //登录成功 我们将token保存在sessionStorage中 
                window.sessionStorage.setItem("token",res.data.data.token);
                //从而返回的到管理后台首页
                this.$router.push("/")


                }else if(res.data.meta.status === 400 ){
                  //说明用户名和密码错误 提示用户
                }
            })


          } else {
             this.$message.error('很抱歉，用户名和密码不能为空');
            return false;
         }
       })
    }
  },
}
</script>

<style lang="scss">
  .form-container{
    background-color:#324152;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    

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
  }
  
</style>
