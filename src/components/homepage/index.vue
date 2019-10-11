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
      <div style="height: 50px;width: 200px;padding: 15px">
        <div style="float:left;top: 10px;" class="loader">
          <div class="face">
            <div class="circle"></div>
          </div>
          <div class="face">
            <div class="circle"></div>
          </div>
        </div>
        <span style="float:left;font-size: 40px;margin-left: 20px">实验室</span>
      </div>
<!--      <canvas id="canvas" width="500" height="500">cccc</canvas>-->
      <div class="square" v-for="number in numbers" :key="number.name">
        <div style="font-size: 38px">
          种类：{{number.name}}{{username}}
        </div>
        <div>实验台ID：{{number.deviceid}}</div>
        <div>培育天数：{{number.day}}天</div>
        <div>描述：<textarea v-model="number.msg"></textarea></div>
        <el-button type="success" @click="chooseDevice(number.deviceid)">进入实验室</el-button>
      </div>
      <div class="el-icon-circle-plus-outline" style="font-size: 300px;color: #50d7ba"></div>
      <div style="clear: both"></div>
    </el-main>
  </el-container>
</template>

<script>
import data from '../cache'
export default {
  name: 'homepage',
  data () {
    return {
      username: null,
      numbers: [
        {name: '青菜', msg: 'test1fdasfjasdkjasldgasdasdgasdfasdffadsfasfafadf', deviceID: '123132132', day: '5'},
        {name: '土豆', msg: 'test2adsgasdgagasdgasdgasdgads', deviceID: '123132132', day: '8'}
      ]
    }
  },
  mounted () {
    // 获取用户名
    this.username = sessionStorage.getItem('username')
    console.log(sessionStorage.getItem('username'))
    let showdev = new FormData()
    showdev.append('username', this.username)
    this.axios.post(data.serverSrc + '/userdev/showdev', showdev).then(body => {
      console.log(body)
      this.numbers = body.data
    })
  },
  methods: {
    chooseDevice (deviceID) {
      // 存储选中的设备id
      sessionStorage.setItem('chooseDevice', deviceID)
      this.enterInterface()
    },
    enterInterface () {
      // 跳转单个实验台详细界面
      this.$router.push('/homepage')
    }
  }
}
</script>

<style scoped>
  @import "../../style/style.css";
  @import "../../style/translateelement.css";
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
  .square {
    float: left;
    margin: 10px 0px 10px 10px;
    height: 300px;
    width: 300px;
    border-radius: 20px;
    background-color: whitesmoke;
    box-shadow: 0 2px 4px rgba(0,0,0,12),0 0 6px rgba(0, 0, 0, .04);
  }
</style>
