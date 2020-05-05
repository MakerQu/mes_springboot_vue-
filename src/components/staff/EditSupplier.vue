<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改供应商</el-breadcrumb-item>
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
              <el-select v-model="form.supplier_category_id" placeholder="请选择客户分类"  style="width: 100%">
                <el-option :selected="supCat.upplier_category_id == form.supplier_category_id" v-for="supCat in supCats" :label="supCat.supplier_category_name" :value="supCat.upplier_category_id"></el-option>
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
              <el-switch v-model="form.status" :active-value="1" :inactive-value="0" style="float: left;margin-left: 15px;margin-top: 10px"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button>取消</el-button>
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
        form: {
          supplier_code: '',
          supplier_name: '',
          supplier_category_id: '',
          contact: '',
          begin_arrears: '',
          company_phone: '',
          status: '',
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
        },
        supCats:[]
      }
    },
    methods: {
      onSubmit(){
        const _this = this
        console.log(this.form)
        const url = this.HOST+"/suppliers/"+ _this.form.supplier_id
        Axios.put(url,this.form).then(function (resp){
           console.log(resp)
           alert('修改成功！');
        })
        .catch(function (error) {
          console.log(error);
        })
      },
      //获取供应商目录
      supplierCategory(){
        const url_cat = this.HOST+"/supCats"
        const _this = this
        Axios.get(url_cat).then(function (data1) {
          //console.log(resp)
          // if(resp.status != 200)return this.$message.error(resp.data.msg)
          _this.supCats = data1.data
          console.log(_this.supCats)
        })
      },
      //获取当前供应商序号对应的名字
      SupCatName(){

      }
    },
    created(){
      // alert(this.$route.query.supplier)
      this.form = this.$route.query.supplier
      this.supplierCategory()
    }
  }
</script>

<style scoped>

</style>
