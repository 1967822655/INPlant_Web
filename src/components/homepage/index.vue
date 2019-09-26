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
          种类：{{number.name}}
        </div>
        <div>实验台ID：{{number.deviceID}}</div>
        <div>培育天数：{{number.day}}天</div>
        <div>描述：<textarea v-model="number.msg"></textarea></div>
      </div>
      <div class="el-icon-circle-plus-outline" style="font-size: 300px;color: #50d7ba"></div>
      <div style="clear: both"></div>
      <el-button type="success" @click="enterInterface">进入主页</el-button>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
      numbers: [
        {name: '青菜', msg: 'test1fdasfjasdkjasldgasdasdgasdfasdffadsfasfafadf', deviceID: '123132132', day: '5'},
        {name: '土豆', msg: 'test2adsgasdgagasdgasdgasdgads', deviceID: '123132132', day: '8'}
      ]
    }
  },
  mounted () {
    // var canvas = document.getElementById('canvas')
    // var ctx = canvas.getContext('2d')
    //
    // ctx.strokeStyle = '#00ffff'
    // ctx.lineWidth = 17
    // ctx.shadowBlur = 15
    // ctx.shadowColor = '#00ffff'
    //
    // function degToRad (degree) {
    //   var factor = Math.PI / 180
    //   return degree * factor
    // }
    //
    // function renderTime () {
    //   var now = new Date()
    //   var today = now.toDateString()
    //   var time = now.toLocaleTimeString()
    //   var hrs = now.getHours()
    //   var min = now.getMinutes()
    //   var sec = now.getSeconds()
    //   var mil = now.getMilliseconds()
    //   var smoothsec = sec + (mil / 1000)
    //   var smoothmin = min + (smoothsec / 60)
    //
    //   // Background
    //   var gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 300)
    //   gradient.addColorStop(0, '#03303a')
    //   gradient.addColorStop(1, 'black')
    //   ctx.fillStyle = gradient
    //   // ctx.fillStyle = 'rgba(00 ,00 , 00, 1)';
    //   ctx.fillRect(0, 0, 500, 500)
    //   // Hours
    //   ctx.beginPath()
    //   ctx.arc(250, 250, 200, degToRad(270), degToRad((hrs * 30) - 90))
    //   ctx.stroke()
    //   // Minutes
    //   ctx.beginPath()
    //   ctx.arc(250, 250, 170, degToRad(270), degToRad((smoothmin * 6) - 90))
    //   ctx.stroke()
    //   // Seconds
    //   ctx.beginPath()
    //   ctx.arc(250, 250, 140, degToRad(270), degToRad((smoothsec * 6) - 90))
    //   ctx.stroke()
    //   // Date
    //   ctx.font = '25px Helvetica'
    //   ctx.fillStyle = 'rgba(00, 255, 255, 1)'
    //   ctx.fillText(today, 175, 250)
    //   // Time
    //   ctx.font = '25px Helvetica Bold'
    //   ctx.fillStyle = 'rgba(00, 255, 255, 1)'
    //   ctx.fillText(time + ':' + mil, 175, 280)
    // }
    // setInterval(renderTime, 40)
  },
  methods: {
    enterInterface () {
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
