<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 30px;">
      <el-col :span="6">
        <el-card shadow="hover" style="background-color: #5cb87a">
          <div style="display: inline;float: left">
            <h5 class="text-muted">计划量</h5>
            <h2 class="mb-0"> 10,28,056</h2>
          </div>
          <div style="display: inline;float: right">
            <i class="el-icon-s-claim" style="font-size:400%"></i>
          </div>

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" style="background-color: #e6a23c">
          <div style="display: inline;float: left">
            <h5 class="text-muted">实际产量</h5>
            <h2 class="mb-0"> 724，763</h2>
          </div>
          <div style="display: inline;float: right">
            <i class="el-icon-menu"  style="font-size:400%"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
      <el-card shadow="hover" style="background-color: #f56c6c">
        <div style="display: inline;float: left">
          <h5 class="text-muted">不良率</h5>
          <h2 class="mb-0">14%</h2>
        </div>
        <div style="display: inline;float: right">
          <i class="el-icon-s-release" style="font-size:400%" ></i>
        </div>
      </el-card>
    </el-col>
      <el-col :span="6">
      <el-card shadow="hover" style="background-color: #8896b3">
        <div style="display: inline;float: left">
          <h5 class="text-muted">实到/应到</h5>
          <h2 class="mb-0"> 853/899</h2>
        </div>
        <div style="display: inline;float: right">
          <i class="el-icon-s-custom" style="font-size:400%" ></i>
        </div>
      </el-card>
    </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-bottom: 10px;">
      <el-col :span="14"><div id="line" style="width: 800px;height:500px;display: inline"></div></el-col>
      <el-col :span="10"><div id="pie" style="width: 400px;height:400px;display: inline"></div></el-col>
    </el-row>
  </div>


</template>

<script>
    import echarts from "echarts";
    import  Axios from "axios";

    export default {
      name: "Dashboard",
      data(){
          return{}
      },
      mounted(){
          this.drawline();
      },
      methods:{
          drawline(){
            const  url = this.HOST+"/sys/echarts/line"

            //柱状图部分
            var myChart = echarts.init(document.getElementById('line'));

            // 指定图表的配置项和数据
            var option = {
              title: {
                text: '每日产量'
              },
              tooltip: {},
              legend: {
                data:['产量']
              },
              xAxis: {
                data: []
              },
              yAxis: {},
              series: [{
                name: '产量',
                type: 'bar',
                data: []
              }]
            };

            Axios.get(url).then(function (resp) {
              console.log(resp)
              option.xAxis.data = resp.data.xAxis;
              option.series[0].data = resp.data.seriesData;
              // 使用刚指定的配置项和数据显示图表。
              myChart.setOption(option);
            })

            //饼状图部分
            var myChart2 = echarts.init(document.getElementById('pie'));
            // 指定图表的配置项和数据
            var option2 = {
              series : [
                {
                  name: '访问来源',
                  type: 'pie',    // 设置图表类型为饼图
                  radius: '45%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                  data:[
                    {"value":235, "name":"一季度"},
                    {"value":274, "name":"二季度"},
                    {"value":310, "name":"三季度"},
                    {"value":335, "name":"四季度"}
                  ]
                }
              ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart2.setOption(option2);

          }
      },
      created(){

      }
    }

</script>

<style scoped>
  .text-muted{
    margin-top: 0px;
    margin-left: 20px;
  }
  .mb-0{
    margin-left: 15px;
  }
</style>
