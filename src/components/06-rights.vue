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
                        :data="rightList"
                        border
                        style="width: 100%">
                         <el-table-column
                         type="index"
                        label="#"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="authName"
                        label="权限名称"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="path"
                        label="路径"
                        width="300">
                        </el-table-column>
                         <el-table-column
                        prop="level"
                        label="层级"
                        width="120">
                        <template slot-scope="prop">
                           <span v-if="prop.row.level === '0'">一级</span>
                           <span v-if="prop.row.level === '1'">二级</span>
                           <span v-if="prop.row.level === '2'">三级</span>
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
      level3: "权限列表",
      rightList:[]
    };
  },
 async created() {
    //发送请求
   let res = await this.$axios.get("rights/list")
    //    console.log(res);
    this.rightList = res.data.data
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

