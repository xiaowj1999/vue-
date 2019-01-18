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
                              <el-input placeholder="请输入内容" v-model="goodsList.query">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                              </el-input>
                          </div>
                      </el-col>
                      <el-col :span="16">
                          <div class="grid-content bg-purple">
                              <el-button type="danger" plain>添加商品</el-button>
                          </div>
                      </el-col>
                  </el-row>
            <el-row>
                    <el-col :span="24">
                        <el-table
                        :data="goodsList"
                        border
                        style="width: 100%">
                         <el-table-column
                         type="index"
                        label="#"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="goods_name"
                        label="商品名称"
                        width="500">
                        </el-table-column>
                        <el-table-column
                        prop="goods_price"
                        label="商品价格"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="goods_weight"
                        label="商品重量"
                        width="200"> 
                       </el-table-column>
                         <el-table-column
                        prop="add_time"
                        label="创建时间"
                        width="200">
                        <template slot-scope="prop">
                            <span>{{prop.row.add_time | modelTime}}</span>
                        </template>
                        </el-table-column>
                         <el-table-column
                        prop="operate"
                        label="操作">
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
                     <el-pagination
                        :current-page="goodsList.pagenum"
                        :page-sizes="[6, 8,10]"
                        :page-size="goodsList.pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        >
                    </el-pagination>
                </el-col>
            </el-row>
   </div>

</template>
<script>
export default  {
  data() {
    return {
      level2: "商品管理",
      level3: "商品列表",
      goodPage: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      goodsList:[]

    };
  },
  methods:{
    async getGoods(){
               //发送请求
        let res = await this.$axios.get("goods", {
                params: this.goodPage
            }) .then(res => {
                // console.log(res);
                this.goodsList = res.data.data.goods;
                this.total = res.data.data.total;
            });
    },
    currentChange(pagenum){
          console.log(pagenum);
          
          //点击时获取到的页码数
          this.goodPage.pagenum= pagenum
          this.getGoods()
    },
    sizeChange(pagesize){
        //修改pagesize的值
        this.goodPage.pagesize = pagesize;
        //同时重置pagenum为1
        this.goodPage.pagenum = 1
        this.getGoods()
    }
  },
  async created() {
     this.getGoods()
     
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

