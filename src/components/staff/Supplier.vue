<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
      <el-breadcrumb-item>供应商列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="24">
      <el-card shadow="always">
        <div style="margin-top: 0px;">
          <router-link :to="{ path: '/addsupplier' }"><el-button type="primary">新增</el-button></router-link>

          <!--上传-->
          <el-upload
            :show-file-list="false"
            accept="application/vnd.ms-excel"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
            :disabled="importDataDisabled"
            style="display: inline-flex;margin-right: 0"
            :action="actionup">
            <el-button :disabled="importDataDisabled" type="success" :icon="importDataBtnIcon">
              导入
            </el-button>
          </el-upload>

          <el-button type="danger" @click="ExportSup">导出</el-button>

          <!--选择类别-->
          <span style="margin-left: 15px">供应商类别：</span>
          <el-select v-model="value1" placeholder="请选择" size="medium">
            <el-option
              v-for="item in options"
              :key="item.supplier_category_id"
              :label="item.supplier_category_name"
              :value="item.supplier_category_id"
              @click.native="searchByCategory(item.supplier_category_id)">
            </el-option>
          </el-select>

          <!--搜索框-->
          <span style="margin-left: 15px">搜索：</span>
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="width: 25%;" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
          </el-input>

          <!--表格-->
          <!-- :data 数据源-->
          <el-table
            :data="tableData"
            style="width: 100%;text-align: center;margin-top: 15px"
            border
            stripe
            >
          <!--索引列-->
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="编号"
              prop="supplier_code"
              width="180">
            </el-table-column>
            <el-table-column
              label="名称"
              prop="supplier_name"
              width="180">
            </el-table-column>
            <el-table-column
              label="应收欠款(元)"
              prop="begin_arrears"
              width="120">
            </el-table-column>
            <el-table-column
              label="单位电话"
              prop="contact_number"
              width="180">
            </el-table-column>
            <el-table-column
              label="联系人"
              prop="contact"
              width="120">
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              width="120">
              <template slot-scope="scope">
                <!--{{scope.row.status?'启动':'暂停'}}-->
                <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" style="float: left;margin-left: 15px;margin-top: 10px"
                @change="statueChange(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total"
            style="margin-top: 15px"
            @current-change="page"
          >
          </el-pagination>
        </div>
      </el-card>

    </el-col>

  </div>

</template>

<script>
  import "@/assets/css/common.css"
  import  Axios from "axios";

  export default {
    name: "Supplier",
    data() {
      return {
        tableData: [],
        input3:'',
        options:[],
        actionup: this.HOST + "/ImportSup"
      }
    },
    methods: {
      fileUpload(event){
        // 上传文件
        console.log(event);

        let file = event.target.files
        let formData = new FormData()
        formData.append('category', 'settingPic')
        formData.append('file', file[0])
        console.log(formData);
        const  url = this.HOST + "/ImportSup"
        // 文件上传
        this.$axios({
          method: "POST",
          url: url,
          data: formData
        }).then((res) => {
          let data = res.data
          if(data.success) {
            console.log(data);
          } else {
            this.$message.error(data.message || '操作失败')
          }
          this.uploadLoading = false
        }).catch((e)=>{
          this.uploadLoading = false
          alert(e)
        })
      },

      //导出到Excel
      ExportSup(){
        const  url = this.HOST+ "/ExportSup"
        window.open(url,"parent")
      },
      //查询某一类别
      searchByCategory(cat){
        const  url = this.HOST+"/searchCat/" + cat
        const _this = this
        console.log("已响应")
        Axios.get(url).then(function (resp) {
          console.log(resp)
          _this.tableData = resp.data
          _this.total = resp.data.length
        })
      },

      //按名称搜索
      searchName(){
        const  url = this.HOST+"/searchName/" + this.input3
        const _this = this
        Axios.get(url).then(function (resp) {
          console.log(resp)
          _this.tableData = resp.data
          _this.total = resp.data.length
        })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({
          path:'/editSupplier',
          //传数据
          query:{
            supplier:row
          }
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
        const url = this.HOST+"/suppliers/"+ row.supplier_id
        Axios.delete(url).then(function (resp){
          console.log(resp)
          alert('删除成功！');
          window.location.reload()
        })
          .catch(function (error) {
            console.log(error);
          })
      },
      page(currentPage){
        const pageSize=10
        const  url = this.HOST+"/sups/"+(currentPage-1)
        const _this = this

        Axios.get(url).then(function (resp) {
          console.log(resp)
          _this.tableData = resp.data.content

        })
      },
      statueChange(data){
        console.log(data)
         const url = this.HOST+"/suppliers/"+ data.supplier_id
         Axios.put(url,data).then(function (resp){
           console.log(resp)
           alert('修改成功！');
         })
         .catch(function (error) {
           console.log(error);
         })
      },
      beforeUpload() {
        this.importDataBtnText = '正在导入';
        this.importDataBtnIcon = 'el-icon-loading';
        this.importDataDisabled = true;
      },
      onError(err, file, fileList) {
        this.importDataBtnText = '导入数据';
        this.importDataBtnIcon = 'el-icon-upload2';
        this.importDataDisabled = false;
      },
      onSuccess(response, file, fileList) {
        this.importDataBtnText = '导入数据';
        this.importDataBtnIcon = 'el-icon-upload2';
        this.importDataDisabled = false;
        this.initEmps();
      },
    },
    created(){
      //每页数量
      const pageSize=10

      // 获取列表数据
      const  url = this.HOST+"/sups/0"
      const _this = this

      Axios.get(url).then(function (resp) {
         console.log(resp)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })

      //获取“供应商类别”信息
      const url_cat = this.HOST+"/supCats"
      Axios.get(url_cat).then(function (data1) {
        //console.log(resp)
        // if(resp.status != 200)return this.$message.error(resp.data.msg)
        console.log(data1)
        _this.options = data1.data
      })
    }
  }
</script>

<style scoped>

</style>
