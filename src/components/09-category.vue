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
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <el-button type="danger" plain>添加分类</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="categoryList" border style="width: 100%">
                  <!-- 树形控件 -->
                    <el-tree-grid
                        prop="cat_name"
                        label="分类名称"
                        width="220"
                        treeKey="cat_id"
                        parentKey="cat_pid"
                        childKey="children"
                        levelKey="cat_level"
                        :indentSize="30"
                        >
                        </el-tree-grid>
                   <el-table-column prop="cat_level" label="级别" width="200">
                        <template slot-scope="prop">
                            <span v-if="prop.row.cat_level===0">一级</span>
                            <span v-else-if="prop.row.cat_level===1">二级</span>
                            <span v-else>三级</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cat_deleted" label="是否有效" width="200">
                        <template slot-scope="prop">
                            <span v-if="prop.row.cat_deleted==='false'">无效</span>
                            <span v-else>有效</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operate" label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" plain size="small"></el-button>
                            <el-button type="danger" icon="el-icon-delete" plain size="small"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-pagination :current-page="categoryList.pagenum" :page-sizes="[6, 8,10]" :page-size="categoryList.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" @current-change="currentChange" @size-change="sizeChange">
                </el-pagination>
            </el-col>
        </el-row>
    </div>

</template>
<script>
import ElTreeGrid from "element-tree-grid";
export default {
    components:{
        ElTreeGrid
    },
    data() {
        return {
        level2: "商品管理",
        level3: "商品列表",
        goodPage: {
            type: 3,
            pagenum: 1,
            pagesize: 10
        },
        total: 0,
        categoryList: []
        };
  },
  methods: {
    async getCategories() {
      //发送请求
      let res = await this.$axios.get("categories?type=3", {
        params: this.goodPage
      });
    //   console.log(res);

      this.categoryList = res.data.data.result;
      this.total = res.data.data.total;
    },
    currentChange(pagenum) {
    //   console.log(pagenum);

      //点击时获取到的页码数
      this.goodPage.pagenum = pagenum;
      this.getCategories();
    },
    sizeChange(pagesize) {
      //修改pagesize的值
      this.goodPage.pagesize = pagesize;
      //同时重置pagenum为1
      this.goodPage.pagenum = 1;
      this.getCategories();
    }
  },
  async created() {
    this.getCategories();
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

