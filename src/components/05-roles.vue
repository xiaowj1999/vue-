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
                        <el-table
                        :data="roleList"
                        border
                        style="width: 100%">
                         <el-table-column
                         type="index"
                        label="#"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="roleName"
                        label="角色名称"    
                        width="400">
                        </el-table-column>
                        <el-table-column
                        prop="roleDesc"
                        label="角色描述"
                        width="400">
                        </el-table-column>
                         <el-table-column
                        prop="operate"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" plain size="small"></el-button>
                            <el-button type="danger" icon="el-icon-delete" plain size="small"></el-button>
                            <el-button type="warning" icon="el-icon-check" plain size="small"></el-button>
                         </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col>
                     <el-pagination
                        :current-page="tableData.pagenum"
                        :page-sizes="[2, 4, 6, 8]"
                        :page-size="tableData.pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </el-col>
            </el-row> -->
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
     let res= await  this.$axios.get("roles")
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
}
</style>

