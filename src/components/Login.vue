<template>
  <div class="login-container">
    <div class="login_box">
      <!--登录模块-->
      <el-form ref="form" :model="form" label-width="80px" style="margin-top: 50px;margin-right: 25px">
        <h3>系统登录</h3>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <!--登录按钮-->
        <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import  Axios from "axios";

  export default {
    name: "Login",
    data() {
      return{
        form:{
          username:'',
          password:''
        }
      }
    },
    methods:{
      login(form){
        const _this = this
        console.log(this.form)
        const url = this.HOST + "/login"

        Axios.post(url,{
          username : this.form.username,
          password : this.form.password
        }).then(function (resp){
          console.log(resp)
          //登录成功
          if(resp.data.flg == "true"){
            _this.$store.commit('SET_TOKEN',resp.data.token)
            _this.$store.commit('GET_USER', JSON.stringify(resp.data))  //存账户信息
            //this.$router.push({path: this.$route.query.redirect});
            _this.$router.replace({ path:'/dashboard' })
            alert("登录成功！")
          }else{
            _this.$alert(resp.data.msg)
          }
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    }
  }
</script>

<style scoped>
  .login-container {
    height: 100%;
    /*background-color: #2b4b6b;*/
    background-image: url('../assets/back.jpg');
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .btns{
    float: right;
    /*padding: 20px;*/
  }
</style>
