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
                <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
                <el-card class="box-card">
                    <div id="echarts-container" ref="echarts"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>
<script>
import echarts from "echarts";
import { async } from 'q';

export default {
  data() {
    return {
      level2: "数据统计",
      level3: "数据报表",
      options: {
            title: {
                text: '用户数据'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        },
            };
        },
        async mounted() {
            // 基于准备好的dom，初始化echarts实例
            // let myChart = echarts.init(document.getElementById("echarts-container"));
            let myChart = echarts.init(this.$refs.echarts)
            //请求接口，发送请求
            let res = await this.$axios.get("reports/type/1");
            // console.log(res);
            
            for (const key in res.data.data) {
                this.options[key]=res.data.data[key]
            }
            //设置两边留白
            this.options.xAxis[0].boundaryGap= false;
            // 绘制图表
        myChart.setOption(this.options);
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
  #echarts-container {
    width: 800px;
    height: 500px;
  }
}
</style>

