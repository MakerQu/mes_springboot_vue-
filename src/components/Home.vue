<template>
  <div>
    <el-container>
      <el-header>
        <div class="home-logo" style="text-align: center;">
          <span>MES管理系统</span>
        </div>
        <el-button type="info">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: #545c64">
          <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true">
            <el-menu-item index="dashboard">
              <i class="el-icon-menu"></i>
              <span slot="title">生产看板</span>
            </el-menu-item>

            <el-submenu index="machine">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>设备管理</span>
              </template>
              <el-menu-item-group>
                <!--<template slot="title">分组一</template>-->
                <el-menu-item index="table">设备列表</el-menu-item>
                <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="employee">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>员工管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="table">员工列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="supplier">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>供应商管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="supplier">供应商列表</el-menu-item>
                <el-menu-item index="addsupplier">新增供应商</el-menu-item>
                <el-menu-item index="addSupplierCategory">供应商分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>


  export default {
      name: "home",
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    components:{

    }
  }
</script>

<style>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }

  /*body > .el-container {*/
    /*!*margin-bottom: 40px;*!*/
  /*}*/

  /*.el-container:nth-child(5) .el-aside,*/
  /*.el-container:nth-child(6) .el-aside {*/
    /*line-height: 260px;*/
  /*}*/

  /*.el-container:nth-child(7) .el-aside {*/
    /*line-height: 320px;*/
  /*}*/
  .el-header {
    background-color: #B3C0D1;
    /*color: #333;*/
    /*line-height: 60px;*/
    display: flex;
    justify-content: space-between;
    /*padding-left: 0;*/
    align-items: center;
    color:#fff;
    font-size: 20px;
  }
  .home-logo{
    display: flex;
    align-items: center;
  }
</style>
