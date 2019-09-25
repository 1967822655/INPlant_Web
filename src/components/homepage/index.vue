<template>
  <el-container style="height: 100%">
    <el-header>
      <el-menu
        class="el-menu-demo"
        background-color="#447ed9"
        text-color="#fff"
        active-text-color="#fff"
        mode="horizontal"
      >
        <div style="float: left;height: 60px;"><img src="../../assets/logo.png" style="height: 40px;width:110px"></div>
        <div style="float: left;color:#fff;height: 60px;line-height: 60px">智能种植系统</div>
        <el-submenu index="1" style="float: right;right: 0px;">
          <template slot="title">
            你好！
          </template>
          <!--          <el-menu-item index="2-1">个人信息</el-menu-item>-->
          <el-menu-item>退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main>
      <el-menu
        class="el-menu-demo"
        background-color="#fff"
        text-color="#fff"
        active-text-color="#fff"
        mode="horizontal"
      >
        实验室
      </el-menu>
<!--      <p>实验室</p>-->
      <el-button type="success" @click="enterInterface">进入主页</el-button>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'homepage',
  // data () {},
  mounted () {
  },
  methods: {
    enterInterface () {
      this.$router.push('/homepage')
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    padding: 0px;
    /*text-align: center;*/
    /*line-height: 60px;*/
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0px;
    /*text-align: center;*/
    /*line-height: 160px;*/
  }
  body > .el-container {
    margin-bottom: 40px;
  }
</style>
