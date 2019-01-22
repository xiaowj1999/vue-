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
      <el-col :span="24">
        <el-button @click="addvisible=true">添加角色</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="roleList" border style="width: 100%">
          <el-table-column width="60" type="expand">
            <template slot-scope="props">
              <el-row v-if="props.row.children.length ===0">
                <el-col>
                  <span>没有分配权限</span>
                </el-col>
              </el-row>
              <el-row v-for="item in props.row.children" :key="item.id">
                <el-col :span="4">
                  <el-tag closable>{{item.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-row v-for="level2 in item.children" :key="level2.id">
                    <el-col :span="4">
                      <el-tag type="success" closable>{{level2.authName}}</el-tag>
                    </el-col>
                    <el-col :span="20">
                      <el-tag type="warning" closable v-for="level3 in level2.children" :key="level3.id">
                        {{level3.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#" width="60">
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称" width="400">
          </el-table-column>
          <el-table-column prop="roleDesc" label="角色描述" width="400">
          </el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="roleEdit(scope.row)" plain size="small"></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="delOne(scope.row)" plain size="small"></el-button>
              <el-button type="warning" icon="el-icon-check" plain size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addvisible">
      <el-form :model="roleForm" label-position="right" label-width="100px" :rules="rules" ref="userRole">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="roleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addvisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('userRole')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色编辑对话框 -->
        <el-dialog title="编辑角色" :visible.sync="editvisible">
            <el-form :model="editRole" label-position="right" label-width="100px" :rules="rules" ref="editRole">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="editRole.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="editRole.roleDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editvisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditRole('editRole')">确 定</el-button>
            </div>
        </el-dialog>
  </div>

</template>
<script>
export default {
  data() {
    return {
      level2: "权限管理",
      level3: "角色列表",
      roleList: [],
      //添加用户角色
      addvisible: false,
      //验证表单规则
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 32, message: "数据不能为空", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "change" },
          { min: 3, max: 32, message: "数据不能为空", trigger: "blur" }
        ]
      },
      //提交表单数据
      roleForm: {
        roleName: "",
        roleDesc: ""
      },
      //角色编辑数据
      editvisible:false,
      editRole: {}
    };
  },
  methods: {
    async getRoles() {
      //发送请求
      let res = await this.$axios.get("roles");
      // console.log(res);
      this.roleList = res.data.data;
    },
    //添加角色
    submitForm(formName) {
      //获取表单元素 并且验证
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证成功
          //接受数据 发送请求
          let res = await this.$axios.post("roles", this.roleForm);
          // console.log(res);
          if (res.data.meta.status === 201) {
            //如果添加成功 点击确认弹框小时
            this.addvisible = false;
            //同时在调用数据、
            this.getRoles();
          }
        } else {
          this.$message.error("请确认数据是否输入正确");
          return false;
        }
      });
    },
    //删除角色用户
    delOne(data) {
      // console.log(data);
      
      //提示用户 同时调用接口发送请求
      this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$axios.delete(`roles/${data.id}`);
          //重新获取信息
          this.getRoles();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑角色用户,显示编辑框
    roleEdit(data){
      console.log(data);
      
      this.editvisible= true;
      this.editRole=data
    },
    //点击确认 提交数据
    submitEditRole(formName){
       //获取表单元素 并且验证
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证成功
          //接受数据 发送请求
          let res = await this.$axios.put(`roles/${this.editRole.id}`, this.editRole);
          console.log(res);
          if (res.data.meta.status === 200) {
            //如果添加成功 点击确认弹框小时
            this.editvisible = false;
            //同时在调用数据、
            this.getRoles();  
          }
        } else {
          this.$message.error("请确认数据是否输入正确");
          return false;
        }
      });
    }
  },
  async created() {
    this.getRoles()
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
  .el-tag {
    margin: 8px;
  }
}
</style>

