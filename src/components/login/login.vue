<template>
    <div class="container">
      <div class="login-picture">
        <div class="login-form">
          <p class="title">用户登录</p>
          <span class="login-item error">{{inputError}}</span>
          <el-input class="login-item" v-model="inputName" placeholder="请输入用户账号" clearable prefix-icon="el-icon-user"></el-input>
          <el-input class="login-item" v-model="inputPasswd" placeholder="请输入密码" prefix-icon="el-icon-key" show-password @keyup.enter="login"></el-input>
          <el-button class="login-item" type="primary" @click="login">登录</el-button>
          <el-link class="login-item" type="primary" :underline="false">忘记密码?</el-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      inputError: '',
      inputName: '',
      inputPasswd: ''
    }
  },
  mounted () {
  },
  methods: {
    login () {
      console.log(this.inputName + this.inputPasswd)
      if (this.inputName === '' || this.inputPasswd === '') {
        this.inputError = '输入不正确'
      } else {
        /* websocket 请求数据，密码是否正确
        * */
        this.$router.push('/index')
      }
    },
    forgetPasswd () {
      console.log('forget passwd')
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    float: left;
    position: relative;
  }
  .container .login-picture {
    height: 100%;
    width: 100%;
    background: beige;
    /*background-image: url(../../assets/banner.jpg);*/
    /*background-repeat: no-repeat;*/
    /*background-size: 100% 100%;*/
  }
  .container .login-form {
    width: 25%;
    /*height: 45%;*/
    position: absolute;
    top: 25%;
    left: 55%;
    overflow: auto;
    background:white;
    border-radius: 10px;
    box-shadow: 2px 5px 5px #888888;
    padding: 20px 0px;
  }
  .container .login-form  .title{
    text-align: center;
    font-size: 20px;
    letter-spacing: 0.2em;
    margin-top: 5px;
    margin-bottom: 25px;
  }
  .container .login-form .login-item{
    width: 90%;
    letter-spacing: 0.1em;
  }
  .container .login-form  .error{
    font-size: 10px;
    color: red;
    margin: 8px 5%;
  }
  .container .login-form .el-input {
    margin: 5px 5%;
  }
  .container .login-form .el-button {
    margin: 10px 5%;
    letter-spacing: 0.6em;
  }
  .container .login-form .el-link {
    margin-top: 10px;
    margin-left: 5%;
    display: block;
    text-align: right;
  }
</style>
