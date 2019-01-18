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
              <el-button type="primary" icon="el-icon-edit" plain size="small"></el-button>
              <el-button type="danger" icon="el-icon-delete" plain size="small"></el-button>
              <el-button type="warning" icon="el-icon-check" plain size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>

</template>
<script>
export default {
  data() {
    return {
      level2: "权限管理",
      level3: "角色列表",
      roleList: []
    };
  },
  async created() {
    //发送请求
    let res = await this.$axios.get("roles");
    console.log(res);
    this.roleList = res.data.data;
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

