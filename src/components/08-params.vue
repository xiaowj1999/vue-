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
    <!-- 提示栏 -->
    <el-row>
      <el-col :span="24">
        <el-alert class="mt mb" title="注意:只允许为第三季分类设置相关参数" type="warning" show-icon>
        </el-alert>
      </el-col>
    </el-row>
    <!-- 商品分类 -->
    <el-row>
      <el-col :span="24">
        <span class="mr">请选择商品分类:</span>
        <el-cascader expand-trigger="hover" :options="paramsList" v-model="this.paramsList" :props="props">
        </el-cascader>
      </el-col>
    </el-row>
    <!-- tab栏切换 -->
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName">
          <el-tab-pane label="动态参数" name="first">
            <el-button type="primary">添加动态参数</el-button>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="second">
            <el-button type="primary">添加静态参数</el-button>
          </el-tab-pane>
        </el-tabs>
        
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-col :span="24">
        <el-table border style="width: 100%">
          <el-table-column width="60">
          </el-table-column>
          <el-table-column label="#" width="60">
          </el-table-column>
          <el-table-column label="商品参数" width="400">
          </el-table-column>
          <el-table-column label="操作">
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
      level2: "商品管理",
      level3: "分类参数",
      // 用户的数据
      paramsList: [],
      //选中的数据
      selectedOptions2: [],
      //别名
      props:{
        label:"cat_name",
        value:"cat_id"
      },
      activeName:"first"
    };
  },
  async created() {
    //发送请求
    let res = await this.$axios.get("categories?type=3");
    // console.log(res);
    this.paramsList = res.data.data;
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

