<template>
    <div class="user-container">
        <el-row>
            <!-- 顶部面包屑盗汗 -->
            <el-col :span="24">
                <div class="grid-content bg-purple-header">
                    <mybreadCrumb :level2="level2" :level3="level3"></mybreadCrumb>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <!-- 用户搜索框 -->
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-input placeholder="请输入内容" v-model="goodPage.query">
                        <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <el-button type="danger" @click="addvisible=true" plain>添加用户</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="index" label="#" width="60">
                    </el-table-column>
                    <el-table-column prop="username" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱" width="300">
                    </el-table-column>
                    <el-table-column prop="mobile" label="电话" width="300">
                    </el-table-column>
                    <el-table-column label="用户状态" width="120">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.mg_state" @change="statusChange(scope.row)" active-color="#13ce66" inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operate" label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" @click="editInfo(scope.row)" plain size="small"></el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="delOne(scope.row)" plain size="small"></el-button>
                            <el-button type="warning" icon="el-icon-check" @click="roleDialog(scope.row)" plain size="small"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-pagination :current-page="goodPage.pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="goodPage.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <!-- 添加用户对话框 -->
        <el-dialog title="添加用户" :visible.sync="addvisible">
            <el-form :model="addForm" label-position="right" label-width="100px" :rules="rules" ref="userForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="addForm.email" type="email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="addForm.mobile" type="mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addvisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('userForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 用户编辑对话框 -->
        <el-dialog title="修改用户" :visible.sync="editvisible">
            <el-form :model="editForm" label-position="right" label-width="100px" :rules="rules" ref="editUser">
                <el-form-item label="用户名" prop="username">
                    <el-input disabled v-model="editForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="editForm.email" type="email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="editForm.mobile" type="mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editvisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('editUser')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 角色分配对话框 -->
        <el-dialog title="分配角色" :visible.sync="roleVisible">
            <el-form>
                <el-form-item label="当前用户" label-width="200">

                </el-form-item>
                <el-form-item label="请选择角色" label-width="200">
                    <el-select>
                        <el-option></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roleVisible = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
export default {
  name: "user",
  data() {
    return {
      level2: "用户管理",
      level3: "用户列表",
      goodPage: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      tableData: {},
      total: 0,
      //验证表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 32, message: "长度在 3 到 32 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请选择活动区域", trigger: "change" },
          { min: 3, max: 32, message: "长度在 3 到 32个字符", trigger: "blur" }
        ]
      },
      //添加用户
      addvisible: false,
      //提交表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //编辑用户信息
      editForm: {
        id: 0,
        username: "",
        email: "",
        mobile: ""
      },
      editvisible: false,
      //分配角色数据
      roleVisible: false,
      selectRole: {}
    };
  },
  methods: {
    async getUsers() {
      let res = await this.$axios.get("users", {
        params: this.goodPage
      });
      //   console.log(res);
      this.tableData = res.data.data.users;
      this.total = res.data.data.total;
    },
    // 查询用户数据
    searchUser() {
      //获取表单中的内容
      this.getUsers();
    },
    //提交表单数据
    submitForm(formName) {
      //  alert(111)
      //获取表单元素 并且验证
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证成功
          //接受数据 发送请求
          let res = await this.$axios.post("users", this.addForm);
          // console.log(res);
          if (res.data.meta.status === 201) {
            //如果添加成功 点击确认弹框小时
            this.addvisible = false;
            //同时在调用数据、
            this.getUsers();
          }
        } else {
          this.$message.error("请确认数据是否输入正确");
          return false;
        }
      });
    },
    //删除数据
    delOne(data) {
      //提示用户 同时调用接口发送请求
      this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$axios.delete(`users/${data.id}`);
          //重新获取信息
          this.getUsers();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //修改数据
    async submitEditForm(formName) {
      let res = await this.$axios.put(
        `users/${this.editForm.id}`,
        this.editForm
      );
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.editvisible = false;
        this.getUsers();
      }
    },

    //编辑用户数据
    async editInfo(data) {
      //显示编辑框
      this.editvisible = true;
      // console.log(data);
      let res = await this.$axios.get(`users/${data.id}`);
      // console.log(res);
      for (const key in this.editForm) {
        this.editForm[key] = res.data.data[key];
      }
    },
    //修改用户状态
    async statusChange(data) {
    //   console.log(data);
      let res = await this.$axios.put(
        `users/${data.id}/state/${data.mg_status}`
      );
    },
    //分配角色 点击按钮显示对话框
    async roleDialog(data) {
      //    console.log(data);  传递被点击的用户的所有数据
      //请求接口 发送请求
      let res = await this.$axios.get("roles");
      // console.log(res);
      this.selectRole = data;
      this.roleVale = res.data.data.roleName;
      this.roleVisible = true;
    }
  },
  created() {
    //发送请求
    this.getUsers();
  }
};
</script>
<style lang="scss">
.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
  padding-top: 0px;
  .el-breadcrumb {
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    padding-left: 10px;
  }
}
</style>

