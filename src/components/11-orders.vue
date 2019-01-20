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
                <el-table :data="orderList" border style="width: 100%">
                    <el-table-column type="index" label="#" width="60">
                    </el-table-column>
                    <el-table-column prop="order_number" label="订单编号" width="180">
                    </el-table-column>
                    <el-table-column prop="order_price" label="订单价格" width="300">
                    </el-table-column>
                    <el-table-column prop="pay_status" label="是否付款" width="120">
                        <template slot-scope="prop">
                            <span v-if="prop.row.pay_status===0">否</span>
                            <span v-else>是</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_send" label="是否发货" width="300">
                    </el-table-column>
                    <el-table-column prop="add_time" label="下单时间" width="200">
                        <template slot-scope="prop">
                            <span>{{prop.row.add_time | modelTime}}</span>
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
                <el-pagination :current-page="orderList.pagenum" :page-sizes="[6, 8,10]" :page-size="orderList.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" @current-change="currentChange" @size-change="sizeChange">
                </el-pagination>
            </el-col>
        </el-row>
    </div>

</template>
<script>
export default {
  data() {
    return {
      level2: "订单管理",
      level3: "订单列表",
      orderList: [],
      goodPage: {
        pagenum: 1,
        pagesize: 10
      },
      total: 0
    };
  },
  methods: {
    async getOrders() {
      let res = await this.$axios.get("orders", {
        params: this.goodPage
      });
    //   console.log(res);
      this.orderList = res.data.data.goods;
      this.total = res.data.data.total;
    },
    currentChange(pagenum) {
    //   console.log(pagenum);

      //点击时获取到的页码数
      this.goodPage.pagenum = pagenum;
      this.getOrders();
    },
    sizeChange(pagesize) {
      //修改pagesize的值
      this.goodPage.pagesize = pagesize;
      //同时重置pagenum为1
      this.goodPage.pagenum = 1;
      this.getOrders();
    }
  },
  async created() {
    //发送请求
    this.getOrders()
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

