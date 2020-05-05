<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加供应商</el-breadcrumb-item>
    </el-breadcrumb>
    <!--输入信息的表单-->
    <el-col :span="12" style="margin-left: 200px">
      <el-card shadow="always">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="编号">
              <el-input v-model="form.supplier_code"></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="form.supplier_name"></el-input>
            </el-form-item>
            <el-form-item label="客户分类">
              <el-select v-model="form.supplier_category_id" placeholder="请选择客户分类" style="width: 100%" :data="supCats">
                <el-option v-for="supplier_category in supCats"
                           :label="supplier_category.supplier_category_name"
                           :value="supplier_category.supplier_category_id"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="form.contact_number"></el-input>
            </el-form-item>
            <el-form-item label="初期欠款">
              <el-input v-model="form.begin_arrears"></el-input>
            </el-form-item>
            <el-form-item label="公司电话">
              <el-input v-model="form.company_phone"></el-input>
            </el-form-item>
            <el-form-item label="运行状态">
              <el-switch v-model="form.status" active-value="1" inactive-value="0" style="float: left;margin-left: 15px;margin-top: 10px"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="resetForm">取消</el-button>
            </el-form-item>
          </el-form>
      </el-card>
    </el-col>
  </div>
</template>

<script>
  import "@/assets/css/common.css"
  import  Axios from "axios";

  export default {
    name: "AddSupplier",
    data() {
      return {
        supCats:[],

        form: {
          supplier_code: '',
          supplier_name: '',
          supplier_category_id: '',
          contact: '',
          begin_arrears: 0,
          company_phone: '',
          status: 1,
        },
        rules: {
          supplier_code: [
            { required: true, message: '请输入status', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          supplier_name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          supplier_category_id: [
            {required: true, message: '请选择客户分类', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      this.supplierCategory()
    },
    methods: {
      onSubmit(){
        const _this = this
        console.log(this.form)
        const url = this.HOST+"/suppliers"


        Axios.post(url,this.form).then(function (resp){
          console.log(resp)
          // alert('添加成功！');
          if(resp.data){
            _this.$alert('添加成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push('/supplier')
              }
            });
          }else{
            this.$message('添加失败')
          }
        })
        .catch(function (error) {
        console.log(error);
        })
      },
      resetForm(form){
        this.$refs[form].resetField();
      },
      //获取供应商目录
      supplierCategory(){
        const url_cat = this.HOST+"/supCats"
        const _this = this
        Axios.get(url_cat).then(function (data1) {
          //console.log(resp)
          // if(resp.status != 200)return this.$message.error(resp.data.msg)
          console.log(data1.data)
          _this.supCats = data1.data

        })
      }
    }
  }
</script>

<style scoped>

</style>
