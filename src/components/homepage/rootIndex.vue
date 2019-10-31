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
          <el-menu-item @click="backLogin()">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <!--    主界面-->
    <el-main style="width:100%;height: 100%">
      <div style="height: 50px;width: 100%;padding: 15px">
        <div style="float:left;top: 10px;" class="loader">
          <div class="face">
            <div class="circle"></div>
          </div>
          <div class="face">
            <div class="circle"></div>
          </div>
        </div>
        <span style="float:left;font-size: 40px;margin-left: 20px">实验室</span>
        <!--      添加模块-->
        <el-button type="primary" @click="showAddDev = 1" style="float: right;margin: 6px 50px">添加实验台</el-button>
        <!--添加设备模块-->
        <div v-if="showAddDev" class="showAddDev">
          <div style="font-size: 30px;float:right;margin-right: 10px;cursor: pointer" @click="showAddDev = 0">×</div>
          <div style="">
            <p>设备名: <input type="text" v-model="addDev.deviceName"></p>
            <p>设备id: <input type="text" v-model="addDev.deviceID"></p>
            <p>
              种类:
              <select name="addDevice" v-model="addDev.kind">
                <option value="tomato">番茄</option>
                <option value="lettuce">生菜</option>
                <option value="celery">芹菜</option>
                <option value="bitterMelon">苦瓜</option>
                <option value="eggplant">茄子</option>
                <option value="melon">甜瓜</option>
              </select>
            </p>
            <p>设备备注: <input type="text" v-model="addDev.remarks"></p>
            <el-button type="primary" @click="addDevice()">添加</el-button>
          </div>
        </div>
      </div>
      <div style="width:100%;height: 85%">
        <div>{{numbers.data}}</div>
      </div>
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
      numbers: {
        data: null,
        tomato: [],
        lettuce: [],
        celery: [],
        bitterMelon: [],
        eggplant: [],
        melon: []
      },
      showAddDev: 0,
      addDev: {
        deviceID: null,
        deviceName: null,
        remarks: null,
        kind: null
      }
    }
  },
  mounted () {
    // 获取用户名
    this.username = sessionStorage.getItem('username')
    if (!this.username) {
      this.$message.error('未登录账号')
      this.$router.push('/')
    }
    console.log(sessionStorage.getItem('username'))
    this.axios.get(data.serverSrc + '/root/showgroup').then(body => {
      console.log(body)
      // for (let i = 0; i < body.data.length; i++) {
      //   if (body.data[i].kind === 'tomato') {
      //     this.numbers.tomato.push(body.data[i])
      //   } else if (body.data[i].kind === 'lettuce') {
      //     this.numbers.lettuce.push(body.data[i])
      //   } else if (body.data[i].kind === 'celery') {
      //     this.numbers.celery.push(body.data[i])
      //   } else if (body.data[i].kind === 'bitterMelon') {
      //     this.numbers.bitterMelon.push(body.data[i])
      //   } else if (body.data[i].kind === 'eggplant') {
      //     this.numbers.eggplant.push(body.data[i])
      //   } else if (body.data[i].kind === 'melon') {
      //     this.numbers.melon.push(body.data[i])
      //   }
      // }
      this.numbers.data = body.data
    })
  },
  methods: {
    // 退出登录
    backLogin () {
      sessionStorage.removeItem('username')
      this.$router.push('/')
    },
    // 存储选中的设备id
    chooseDevice (deviceID) {
      sessionStorage.setItem('chooseDevice', deviceID)
      this.enterInterface()
    },
    // 跳转单个实验台详细界面
    enterInterface () {
      this.$router.push('/INPlant_Web/homepage')
    },
    // 添加设备
    addDevice () {
      if (this.addDev.deviceID && this.addDev.deviceName) {
        let addDevice = new FormData()
        addDevice.append('username', this.username)
        addDevice.append('deviceID', this.addDev.deviceID)
        addDevice.append('kind', this.addDev.kind)
        addDevice.append('devicename', this.addDev.deviceName)
        addDevice.append('remarks', this.addDev.remarks)
        console.log(this.addDev)
        this.axios.post(data.serverSrc + '/userdev/adddev', addDevice).then(body => {
          if (body.data === 'success') {
            this.$message.success('上传成功')
          } else if (body.data === 'failed') {
            this.$message.error('添加失败')
          } else if (body.data === 'has') {
            this.$message.error('用户已拥有设备')
          } else if (body.data === 'device not exsit') {
            this.$message.error('设备不存在')
          } else {
            this.$message.error('上传失败')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  @import "../../style/style.css";
  @import "../../style/translateelement.css";
  .el-header {
    min-width: 625px;
    background-color: #B3C0D1;
    color: #333;
    padding: 0px;
    /*text-align: center;*/
    /*line-height: 60px;*/
  }
  .el-main {
    background-color: #E9EEF3;
    min-width: 625px;
    color: #333;
    padding: 0px;
    overflow: hidden;
    /*text-align: center;*/
    /*line-height: 160px;*/
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  /*.square {*/
  /*  float: left;*/
  /*  margin: 10px;*/
  /*  padding: 10px;*/
  /*  height: 150px;*/
  /*  width: 300px;*/
  /*  border-radius: 20px;*/
  /*  background-color: rgba(255,255,255,0.7);*/
  /*  !*box-shadow: 0 2px 4px rgba(0,0,0,12),0 0 6px rgba(0, 0, 0, .04);*!*/
  /*  font-family: '楷体','宋体',Times, TimesNR, 'New Century Schoolbook',Georgia, 'New York', serif;*/
  /*  font-size: 22px;*/
  /*}*/
  .showAddDev {
    position: absolute;
    top: 61px;
    left: 50%;
    transform: translate(-50%, 0%);
    height: 500px;
    min-width: 500px;
    max-width: 800px;
    width: 80%;
    background-color: #898989;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    z-index: 99;
  }
</style>
