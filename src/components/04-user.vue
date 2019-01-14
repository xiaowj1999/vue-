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
                              <el-input placeholder="请输入内容" v-model="tableData.query">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                              </el-input>
                          </div>
                      </el-col>
                      <el-col :span="16">
                          <div class="grid-content bg-purple">
                              <el-button type="danger" plain>添加用户</el-button>
                          </div>
                      </el-col>
                  </el-row>
            <el-row>
                    <el-col :span="24">
                        <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                         <el-table-column
                         type="index"
                        label="#"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="username"
                        label="姓名"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="email"
                        label="邮箱"
                        width="300">
                        </el-table-column>
                        <el-table-column
                        prop="mobile"
                        label="电话"
                        width="300"> 
                       </el-table-column>
                         <el-table-column
                        prop="status"
                        label="用户状态"
                        width="120">
                        <template slot-scope="scope">
                            <el-switch
                            v-model="scope.row.mg_state"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                            </el-switch>
                        </template>
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
            <el-row>
                <el-col>
                     <el-pagination
                        :current-page="tableData.pagenum"
                        :page-sizes="[2, 4, 6, 8]"
                        :page-size="tableData.pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </el-col>
            </el-row>
   </div>

</template>
<script>
export default {
  data() {
    return {
      level2: "用户管理",
      level3: "用户列表",
      tableData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      total: 0
    };
  },
  created() {
    //发送请求
    this.$axios
      .get("users", {
        params: this.tableData
      })
      .then(res => {
        // console.log(res);
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
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

