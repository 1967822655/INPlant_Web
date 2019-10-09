<template>
  <div id="deviceSettings">
    <div class="deviceSettings-title">
      <p>设备调节</p>
    </div>
    <el-divider></el-divider>
    <div class="deviceSettings-content" v-loading.fullscreen.lock="fullscreenLoading">
      <el-row class="deviceSettings-switch" :gutter="10">
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <el-tag class="card-name">风扇</el-tag>
            <el-switch
              v-model="fanSetAndValue"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="commitFanToServer()">
            </el-switch>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <el-tag class="card-name">LED灯</el-tag>
            <el-switch
              v-model="ledSetAndValue"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="commitLedToServer()">
            </el-switch>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <el-tag class="card-name">循环泵</el-tag>
            <el-switch
              v-model="pumpSetAndValue"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="commitPumpToServer()">
            </el-switch>
          </el-card>
        </el-col>
      </el-row>
      <el-row  class="deviceSettings-input" :gutter="10">
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <el-tag class="card-name">营养液浓度(us/cm)</el-tag>
            <i class="el-icon-edit-outline card-edit" v-show="nutrientNotEdit" @click="nutrientNotEdit = !nutrientNotEdit"></i>
            <i class="el-icon-finished card-edit" v-show="!nutrientNotEdit" @click="commitNutrientToServer()"></i>
            <i class="el-icon-close card-edit" v-show="!nutrientNotEdit" @click="nutrientNotEdit = !nutrientNotEdit"></i>
            <input
              placeholder="请输入内容"
              type="number"
              v-model="nutrientSet"
              :disabled="nutrientNotEdit">
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <el-tag class="card-name">光照时间(s)</el-tag>
            <i class="el-icon-edit-outline card-edit" v-show="lightNotEdit" @click="lightNotEdit = !lightNotEdit"></i>
            <i class="el-icon-finished card-edit" v-show="!lightNotEdit" @click="commitLightToServer()"></i>
            <i class="el-icon-close card-edit" v-show="!lightNotEdit" @click="lightNotEdit = !lightNotEdit"></i>
            <input
              placeholder="-"
              type="number"
              v-model="lightSet"
              :disabled="lightNotEdit">
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <el-tag class="card-name">ph值</el-tag>
            <i class="el-icon-edit-outline card-edit" v-show="phNotEdit" @click="phNotEdit = !phNotEdit"></i>
            <i class="el-icon-finished card-edit" v-show="!phNotEdit" @click="commitPhToServer()"></i>
            <i class="el-icon-close card-edit" v-show="!phNotEdit" @click="phNotEdit = !phNotEdit"></i>
            <input
              placeholder="请输入内容"
              type="number"
              v-model="phSet"
              :disabled="phNotEdit">
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import data from '../cache'
export default {
  name: 'homepage2',
  mounted () {
    // websocket初始化 -> load data of nutrient light fan
    this.initWebSocket()
  },
  data () {
    return {
      nutrientSet: 0,
      lightSet: '-',
      phSet: 0,
      fanSetAndValue: false,
      ledSetAndValue: false,
      pumpSetAndValue: false,
      nutrientNotEdit: true,
      lightNotEdit: true,
      phNotEdit: true,
      fullscreenLoading: false
    }
  },
  methods: {
    // 初始化websocket
    initWebSocket () {
      const path = 'ws://192.168.100.93:8081/webSocket'
      this.websock = new WebSocket(path)
      this.websock.onmessage = this.websocketOnMessage
      this.websock.onopen = this.websocketOnOpen
      this.websock.onerror = this.websocketOnError
      this.websock.onclose = this.websocketClose
      // this.sendDevName(this.clickDev)
      console.log('初始化成功')
    },
    // 连接建立
    websocketOnOpen () {
      this.websocketSend()
    },
    // 连接建立失败重连
    websocketOnError () {
      this.initWebSocket()
    },
    // 数据接收
    websocketOnMessage (e) {
      console.log(data.data)
      if (e.data === 'false') {
        console.log('null')
      } else {
        let data = JSON.parse(e.data)
        console.log(data)
        if (this.nutrientNotEdit) {
          this.nutrientSet = data.ec
        }
        if (this.phNotEdit) {
          this.phSet = data.ph
        }
        this.fanSetAndValue = Boolean(data['fan'])
        this.ledSetAndValue = Boolean(data['LED'])
        this.pumpSetAndValue = Boolean(data['pump'])
      }
    },
    // 数据发送
    websocketSend () {
      this.websock.send('6af6188e14aa')
    },
    // 关闭
    websocketClose () {
      console.log('断开连接')
    },
    /**
     * 1.check inputvalue -> commit to server ->load
     * 3.display true value
     */
    // 发送给服务器
    commitToServer (msg) {
      var upCtrl = new FormData()
      //  this.upCtrl.append('username', localStorage.getItem('username'))
      upCtrl.append('username', '1399472680@qq.com')
      upCtrl.append('deviceID', '6af6188e14aa')
      upCtrl.append('msg', msg)
      this.axios.post(data.serverSrc + '/dev/downctrl', upCtrl).then(body => {
        console.log(body.data)
        this.fullscreenLoading = !this.fullscreenLoading
        this.$notify.info({
          title: '消息',
          message: '提交成功'
        }, 1000)
      })
    },
    // 数值类型
    commitNutrientToServer () {
      this.nutrientNotEdit = !this.nutrientNotEdit
      this.fullscreenLoading = !this.fullscreenLoading
      console.log('commitNutrientToServer')
      var newNutrient = parseInt(this.nutrientSet)
      if (newNutrient >= 0 && newNutrient <= 4400) {
        console.log(newNutrient)
        var msg = JSON.stringify({
          'ec': newNutrient
        })
        console.log(msg)
        this.commitToServer(msg)
      } else {
        this.fullscreenLoading = !this.fullscreenLoading
        this.$notify.error({
          title: '错误',
          message: '输入数值无效'
        }, 1000)
      }
    },
    commitLightToServer () {
      this.lightNotEdit = !this.lightNotEdit
      this.fullscreenLoading = !this.fullscreenLoading
      console.log('commitNutrientToServer')
      var newLight = parseInt(this.nutrientSet)
      if (newLight >= 0) {
        console.log(newLight)
        var msg = JSON.stringify({
          'light': newLight
        })
        console.log(msg)
        this.commitToServer(msg)
      } else {
        this.fullscreenLoading = !this.fullscreenLoading
        this.$notify.error({
          title: '错误',
          message: '输入数值无效'
        }, 1000)
      }
    },
    commitPhToServer () {
      this.phNotEdit = !this.phNotEdit
      this.fullscreenLoading = !this.fullscreenLoading
      console.log('commitNutrientToServer')
      var newPh = parseInt(this.nutrientSet)
      if (newPh >= 0 && newPh <= 14) {
        console.log(newPh)
        var msg = JSON.stringify({
          'ph': newPh
        })
        console.log(msg)
        this.commitToServer(msg)
      } else {
        this.fullscreenLoading = !this.fullscreenLoading
        this.$notify.error({
          title: '错误',
          message: '输入数值无效'
        }, 1000)
      }
    },
    // 开关类型
    commitFanToServer () {
      this.fullscreenLoading = !this.fullscreenLoading
      var msg = JSON.stringify({
        'fan': this.fanSetAndValue ? 1 : 0
      })
      this.commitToServer(msg)
    },
    commitLedToServer () {
      this.fullscreenLoading = !this.fullscreenLoading
      var msg = JSON.stringify({
        'LED': this.ledSetAndValue ? 1 : 0
      })
      this.commitToServer(msg)
    },
    commitPumpToServer () {
      this.fullscreenLoading = !this.fullscreenLoading
      var msg = JSON.stringify({
        'pump': this.pumpSetAndValue ? 1 : 0
      })
      this.commitToServer(msg)
    }
  }
}
</script>

<style scoped>
  #deviceSettings {
    background: white;
    width: 100%;
    margin: 5px;
    padding: 20px;
  }
  #deviceSettings .deviceSettings-content {
    width: 100%;
    position: relative;
  }
  /* 谷歌 */
  #deviceSettings .deviceSettings-content input::-webkit-outer-spin-button,
  #deviceSettings .deviceSettings-content input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
  /* 火狐 */
  #deviceSettings .deviceSettings-content input{
    -moz-appearance:textfield;
  }

  .deviceSettings-switch .box-card {
    margin-bottom: 20px;
    background-color: #FFFFF0;
  }
  .deviceSettings-switch .box-card .card-name{
    margin: 0;
    font-size: 20px;
    letter-spacing: 0.1em;
  }
  .deviceSettings-switch .box-card .el-switch {
    float: right;
    margin-top: 10px;
  }
  .deviceSettings-input .box-card {
    background-color: #87CEFA;
  }
  .deviceSettings-input .box-card .card-name{
    margin: 0;
    font-size: 13px;
    letter-spacing: 0.1em;
  }
  .deviceSettings-input .box-card .card-edit{
    float: right;
    color: white;
    font-size: 1.3em;
    margin-left: 5px;
    margin-top: 5px;
  }
  .deviceSettings-input .box-card .card-edit{
    float: right;
    color: white;
    font-size: 1.3em;
    margin-left: 5px;
  }
  .deviceSettings-input .box-card input {
    width: 100px;
    margin-left: 10px;
    font-size: 23px;
    color: #222222;
    border-radius: 5px;
    border: 1px solid #d9ecff;
  }
  .deviceSettings-input .box-card input:disabled {
    background:none;
    outline:none;
    border:none;
    font-size: 25px;
  }
</style>
