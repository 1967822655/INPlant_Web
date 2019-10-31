<template>
    <div class="container">
      <div class="header" style="">
        <img class="app-logo" src="../../assets/logo.png" />
        <h1>智慧种植系统平台</h1>
        <a href="https://free.modao.cc/app/3rkxnjr01k3k0q3oce5po8q31wvpda#screen=sk0q3ocs96afkwz6g" target="_blank">墨刀样式</a>
        <a href="https://docs.qq.com/sheet/DVWFNV0ZESllORG1j?tab=BB08J2&c=A1A0A0" target="_blank">接口文档</a>
        <a href="http://106.15.195.144:8081/swagger-ui.html#/" target="_blank">接口文档(最新版)</a>
      </div>
      <div class="login-picture">
        <div class="login-form" v-if="choose===1">
          <p class="title">用户登录</p>
          <p class="login-item error">{{inputError}}</p>
          <el-input class="login-item" v-model="inputEmail" placeholder="请输入邮箱账号" clearable prefix-icon="el-icon-user"></el-input>
          <div class="hintBox">
            <div @click="setInput(mail)" class="hintItem"  v-for="mail in emails" :key="mail">{{mail}}</div>
          </div>
          <el-input class="login-item" v-model="inputPassword" placeholder="请输入密码" prefix-icon="el-icon-key" show-password @keyup.enter="login"></el-input>
          <el-button class="login-item" type="primary" @click="login">登录</el-button>
          <div class="login-item" style="margin-left: 5%">
            <el-link type="primary" :underline="false" @click="chooseInterface(2)">注册账号</el-link>
            <el-link class="right" type="primary" :underline="false" @click="chooseInterface(3)">忘记密码?</el-link>
          </div>
        </div>
        <div class="login-form" v-if="choose===2">
          <p class="title1">用户注册</p>
          <el-input class="login-item" v-model="registerEmail" placeholder="请输入邮箱账号" clearable prefix-icon="el-icon-user"></el-input>
          <div class="hintBox">
            <div @click="setInput(mail)" class="hintItem"  v-for="mail in emails" :key="mail">{{mail}}</div>
          </div>
          <div class="login-item" style="margin-left:5%">
            <el-input style="width: 50%;margin: 5px 0px 5px 0px;float: left;" v-model="registerCode" placeholder="请输入验证码"></el-input>
            <el-button style="letter-spacing: 0.1em;margin: 5px 0px 5px 0px;width: 40%;float: right;" type="primary" @click="registerSendCode">发送验证</el-button>
          </div>
          <el-input class="login-item" v-model="registerPassword" placeholder="请输入密码" prefix-icon="el-icon-key" show-password @keyup.enter="login"></el-input>
          <el-input class="login-item" v-model="registerAgain" placeholder="请确认密码" prefix-icon="el-icon-key" show-password @keyup.enter="login"></el-input>
          <el-button class="login-item" type="primary" @click="register">注册账号</el-button>
          <div class="login-item" style="margin-left: 5%">
            <el-link class="right" type="primary" :underline="false" @click="chooseInterface(1)">返回登录</el-link>
          </div>
        </div>
        <div class="login-form" v-if="choose===3">
          <p class="title1">找回密码</p>
          <el-input class="login-item" v-model="findEmail" placeholder="请输入用户邮箱" clearable prefix-icon="el-icon-user"></el-input>
          <div class="hintBox" v-if="emails">
            <div @click="setInput(mail)" class="hintItem"  v-for="mail in emails" :key="mail">{{mail}}</div>
          </div>
          <div class="login-item" style="margin-left:5%">
            <el-input style="width: 50%;margin: 5px 0px 5px 0px;float: left;" v-model="findCode" placeholder="请输入验证码"></el-input>
            <el-button style="letter-spacing: 0.1em;margin: 5px 0px 5px 0px;width: 40%;float: right;" type="primary" @click="findSendCode">发送验证</el-button>
          </div>
          <el-input class="login-item" v-model="findPassword" placeholder="请输入修改密码" prefix-icon="el-icon-key" show-password @keyup.enter="login"></el-input>
          <el-input class="login-item" v-model="findAgain" placeholder="请确认密码" prefix-icon="el-icon-key" show-password @keyup.enter="login"></el-input>
          <el-button class="login-item" type="primary" @click="find">修改密码</el-button>
          <div class="login-item" style="margin-left: 5%">
            <el-link class="right" type="primary" :underline="false" @click="chooseInterface(1)">返回登录</el-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import data from '../cache'
export default {
  name: 'login',
  data () {
    return {
      choose: 1,
      inputError: '',
      inputEmail: '',
      inputPassword: '',
      registerEmail: '',
      registerCode: '',
      registerPassword: '',
      registerAgain: '',
      findEmail: '',
      findCode: '',
      findPassword: '',
      findAgain: ''
    }
  },
  mounted () {
  },
  methods: {
    // 发送验证码（注册）
    registerSendCode () {
      if (!this.registerEmail) {
        this.$message.error('尚未填写邮箱')
      } else {
        if (!this.checkEmail(this.registerEmail)) {
          this.$message.error('邮箱格式不正确')
        } else {
          // console.log(this.registerEmail)
          let registerCode = new FormData()
          registerCode.append('username', this.registerEmail)
          this.axios.post(data.serverSrc + '/user/regsendcode', registerCode).then(body => {
            // console.log(body)
            if (body.data === 'success') {
              this.$message.success('发送成功')
            } else if (body.data === 'has') {
              this.$message.error('用户已存在')
            } else {
              this.$message.error('发送失败')
            }
          })
        }
      }
    },
    // 注册
    register () {
      if (!this.registerEmail) {
        this.$message.error('尚未填写邮箱')
      } else if (!this.checkEmail(this.registerEmail)) {
        this.$message.error('邮箱格式不正确')
      } else if (!this.registerPassword || !this.registerAgain) {
        this.$message.error('密码不能为空')
      } else if (this.registerPassword !== this.registerAgain) {
        this.$message.error('两次密码不相同')
      } else {
        let registerParam = new FormData()
        registerParam.append('username', this.registerEmail)
        registerParam.append('password', this.registerPassword)
        registerParam.append('code', this.registerCode)
        this.axios.post(data.serverSrc + '/user/reg', registerParam).then(body => {
          console.log(body.data)
          if (body.data === 'success') {
            this.$message.success('注册成功')
            // 跳转登录界面
            this.chooseInterface(1)
          } else if (body.data === 'has') {
            this.$message.error('用户已存在')
          } else if (body.data === 'code error') {
            this.$message.error('验证码错误')
          } else {
            this.$message.error('发送失败')
          }
        })
      }
    },
    // 登录
    login () {
      // console.log(this.inputEmail + this.inputPassword)
      if (!this.inputEmail) {
        this.$message.error('尚未填写邮箱')
      } else if (!this.checkEmail(this.inputEmail)) {
        this.$message.error('邮箱格式不正确')
      } else if (!this.inputPassword) {
        this.$message.error('密码不能为空')
      } else {
        // !!!!!!!!!!!!!!!!!!!!!
        // this.$router.push('/index')// 跳转主界面
        let registerParam = new FormData()
        registerParam.append('username', this.inputEmail)
        registerParam.append('password', this.inputPassword)
        this.axios.post(data.serverSrc + '/user/login', registerParam).then(body => {
          console.log(body.data)
          if (body.data === 'success') {
            sessionStorage.setItem('username', this.inputEmail)// 存储本地用户名
            this.$message.success('登录成功')
            this.$router.push('/INPlant_Web/index')// 跳转主界面
          } else if (body.data === 'root') {
            sessionStorage.setItem('username', this.inputEmail)// 存储本地用户名
            this.$message.success('登录成功')
            this.$router.push('/INPlant_Web/rootIndex')
          } else if (body.data === 'not exist') {
            this.$message.error('用户名不存在')
            this.inputEmail = ''
            this.inputPassword = ''
          } else if (body.data === 'password error') {
            this.$message.error('密码错误')
            this.inputPassword = ''
          } else {
            this.$message.error('发送失败')
          }
        })
      }
      // ！！！！！！！！！！！！！！！！注释！！！！！！！！！！！
      // this.$router.push('/index')
    },
    // 发送验证码（找回）
    findSendCode () {
      if (!this.findEmail) {
        this.$message.error('尚未填写邮箱')
      } else {
        if (!this.checkEmail(this.findEmail)) {
          this.$message.error('邮箱格式不正确')
        } else {
          // console.log(this.findEmail)
          let findCode = new FormData()
          findCode.append('username', this.findEmail)
          this.axios.post(data.serverSrc + '/user/resetpwdsendcode', findCode).then(body => {
            // console.log(body)
            if (body.data === 'success') {
              this.$message.success('发送成功')
            } else if (body.data === 'not exist') {
              this.$message.error('用户名不存在')
            } else {
              this.$message.error('发送失败')
            }
          })
        }
      }
    },
    // 找回密码
    find () {
      if (!this.findEmail) {
        this.$message.error('尚未填写邮箱')
      } else if (!this.checkEmail(this.findEmail)) {
        this.$message.error('邮箱格式不正确')
      } else if (!this.findPassword || !this.findAgain) {
        this.$message.error('密码不能为空')
      } else if (this.findPassword !== this.findAgain) {
        this.$message.error('两次密码不相同')
      } else {
        let findParam = new FormData()
        findParam.append('username', this.findEmail)
        findParam.append('newpassword', this.findPassword)
        findParam.append('code', this.findCode)
        this.axios.post(data.serverSrc + '/user/resetpwd', findParam).then(body => {
          console.log(body.data)
          if (body.data === 'success') {
            this.$message.success('修改成功')
            // 跳转登录界面
            this.chooseInterface(1)
          } else if (body.data === 'error') {
            this.$message.error('修改失败')
          } else if (body.data === 'code error') {
            this.$message.error('验证码错误')
          } else {
            this.$message.error('发送失败')
          }
        })
      }
    },
    // 点击邮箱后缀提示赋值
    setInput (mail) {
      if (this.choose === 1) {
        this.inputEmail = mail
      }
      if (this.choose === 2) {
        this.registerEmail = mail
      }
      if (this.choose === 3) {
        this.findEmail = mail
      }
    },
    // 判断邮箱是否正确
    checkEmail (data) {
      // 正则表达式
      let reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
      // 正则验证不通过，格式不对
      if (!reg.test(data)) {
        return false
      } else {
        return true
      }
    },
    // val值 1： 登录；  2： 注册；  3： 忘记密码；
    chooseInterface (val) {
      this.choose = val
      this.inputEmail = ''
      this.registerEmail = ''
      this.findEmail = ''
    }
  },
  computed: {
    emails () {
      if (this.choose === 1) {
        if (!this.inputEmail) return []
        if (this.inputEmail.indexOf('@') > -1) return []
        return [
          this.inputEmail + '@163.com',
          this.inputEmail + '@126.com',
          this.inputEmail + '@0355.net',
          this.inputEmail + '@263.net',
          this.inputEmail + '@3721.net',
          this.inputEmail + '@qq.com',
          this.inputEmail + '@yahoo.com',
          this.inputEmail + '@gmail.com',
          this.inputEmail + '@msn.com',
          this.inputEmail + '@hotmail.com',
          this.inputEmail + '@aol.com',
          this.inputEmail + '@ask.com',
          this.inputEmail + '@live.com',
          this.inputEmail + '@yeah.net'
        ]
      }
      if (this.choose === 2) {
        if (!this.registerEmail) return []
        if (this.registerEmail.indexOf('@') > -1) return []
        return [
          this.registerEmail + '@163.com',
          this.registerEmail + '@126.com',
          this.registerEmail + '@0355.net',
          this.registerEmail + '@263.net',
          this.registerEmail + '@3721.net',
          this.registerEmail + '@qq.com',
          this.registerEmail + '@yahoo.com',
          this.registerEmail + '@gmail.com',
          this.registerEmail + '@msn.com',
          this.registerEmail + 'hotmail.com',
          this.registerEmail + '@aol.com',
          this.registerEmail + '@ask.com',
          this.registerEmail + '@live.com',
          this.registerEmail + '@yeah.net'
        ]
      }
      if (this.choose === 3) {
        if (!this.findEmail) return []
        if (this.findEmail.indexOf('@') > -1) return []
        return [
          this.findEmail + '@163.com',
          this.findEmail + '@126.com',
          this.findEmail + '@0355.net',
          this.findEmail + '@263.net',
          this.findEmail + '@3721.net',
          this.findEmail + '@qq.com',
          this.findEmail + '@yahoo.com',
          this.findEmail + '@gmail.com',
          this.findEmail + '@msn.com',
          this.findEmail + 'hotmail.com',
          this.findEmail + '@aol.com',
          this.findEmail + '@ask.com',
          this.findEmail + '@live.com',
          this.findEmail + '@yeah.net'
        ]
      }
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
  .container .header {
    padding: 15px 20% 10px;
    height: 40px;
  }
  .container .header .app-logo {
    width: 30px;
  }
  .container .header > h1 {
    display: inline;
    font-size: 1.5em;
    height:30px;
    line-height:30px;
    overflow:hidden;
  }
  .container .header > a {
    float: right;
    padding-top: 15px;
    padding-left: 10px;
  }
  .container .login-picture {
    height: 100%;
    width: 100%;
    background: linear-gradient(120deg, lightskyblue, paleturquoise);
    background-image: url(../../assets/login-bgc.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .container .login-form {
    width: 25%;
    height: 335px;
    position: absolute;
    top: 30%;
    left: 55%;
    overflow: hidden;
    background:white;
    border-radius: 10px;
    box-shadow: 2px 5px 5px #888888;
  }
  .container .login-form  .title{
    text-align: center;
    font-size: 20px;
    letter-spacing: 0.2em;
    margin-top: 25px;
    margin-bottom: 35px;
  }
  .title1 {
    text-align: center;
    font-size: 20px;
    letter-spacing: 0.2em;
    margin-top: 10px;
    margin-bottom: 10px;
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
  .container .login-form {
    margin-top: 10px;
    margin-left: 5%;
    display: block;
  }
  .login-form {
    min-width: 310px;
  }
  .right {
    float: right;
  }
  .hintBox {
    width: 100%;
    max-height: 120px;
    /*overflow-y:scroll;*/
    overflow-x: auto;
    position: absolute;
    z-index: 999;
    background-color: #fff;
  }
  .hintItem {
    margin-top: 2px;
    cursor:pointer;
    margin-left: 45px;
    font-size: 13px;
    color: #898989;
  }
  .hintItem:hover {
    background-color: whitesmoke;
  }
</style>
