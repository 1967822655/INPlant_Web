<template>
  <div class="module">
    <div class="module-title">
      <p>设备调节</p>
    </div>
    <el-divider></el-divider>
    <div class="module-content" v-loading="fullscreenLoading">
      <el-row  class="deviceSettings-input" :gutter="10">
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div>
              <el-tag class="card-name">营养液浓度(us/cm)</el-tag>
              <i class="el-icon-edit-outline card-edit" v-show="nutrientNotEdit" @click="nutrientNotEdit = !nutrientNotEdit"></i>
              <i class="el-icon-finished card-edit" v-show="!nutrientNotEdit" @click="commitNutrientToServer()"></i>
              <i class="el-icon-close card-edit" v-show="!nutrientNotEdit" @click="nutrientNotEdit = !nutrientNotEdit"></i>
            </div>
            <div>
              <input
                type="number"
                v-model="nutrientSet"
                :disabled="nutrientNotEdit">
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div>
              <el-tag class="card-name">光照时间(s)</el-tag>
              <i class="el-icon-edit-outline card-edit" v-show="lightNotEdit" @click="lightNotEdit = !lightNotEdit"></i>
              <i class="el-icon-finished card-edit" v-show="!lightNotEdit" @click="commitLightToServer()"></i>
              <i class="el-icon-close card-edit" v-show="!lightNotEdit" @click="lightNotEdit = !lightNotEdit"></i>
            </div>
            <div>
              <input
                type="number"
                v-model="lightSet"
                :disabled="lightNotEdit">
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div>
              <el-tag class="card-name">ph值</el-tag>
              <i class="el-icon-edit-outline card-edit" v-show="phNotEdit" @click="phNotEdit = !phNotEdit"></i>
              <i class="el-icon-finished card-edit" v-show="!phNotEdit" @click="commitPhToServer()"></i>
              <i class="el-icon-close card-edit" v-show="!phNotEdit" @click="phNotEdit = !phNotEdit"></i>
            </div>
            <div>
              <input
                type="number"
                v-model="phSet"
                :disabled="phNotEdit">
            </div>
          </el-card>
        </el-col>
      </el-row>
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
    </div>
  </div>
</template>

<script>
import data from '../cache'
export default {
  name: 'homepage2',
  created () {
    // websocket初始化 -> load data of nutrient light fan
    this.initWebSocket()
  },
  // 离开该层时执行
  beforeDestroy () {
    // 离开路由之后断开websocket连接
    console.log('离开homepage2')
    this.websock.close()
  },
  data () {
    return {
      nutrientSet: 0,
      lightSet: 0,
      phSet: 0,
      fanSetAndValue: false,
      ledSetAndValue: false,
      pumpSetAndValue: false,
      nutrientNotEdit: true,
      lightNotEdit: true,
      phNotEdit: true,
      fullscreenLoading: false,
      editObjectName: '',
      websock: undefined
    }
  },
  methods: {
    // 初始化websocket
    initWebSocket () {
      const path = 'ws://106.15.195.144:8081/webSocket'
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
      console.log(e.data)
      if (e.data === 'false') {
        console.log('null')
      } else {
        let data = JSON.parse(e.data)
        // console.log(data)
        /**
         * 修改状态中，开关类型参数等待10s内，再显示实时数据正常值
         */
        if (this.editObjectName !== '') {
          // console.log(this.editObjectName)
          setTimeout(() => {
            //  返回初始值
            this.editObjectName = ''
          }, 1000 * 10)
        } else {
          /**
           * 未修改状态中如果数据没变化则不需要同步到view层
           */
          if (this.nutrientNotEdit && this.nutrientSet !== data.ec) {
            this.nutrientSet = data.ec
          }
          if (this.phNotEdit && this.nutrientSet !== data.ph) {
            this.phSet = data.ph
          }
          if (this.fanSetAndValue !== Boolean(data['fan'])) {
            this.fanSetAndValue = Boolean(data['fan'])
          }
          if (this.ledSetAndValue !== Boolean(data['LED'])) {
            this.ledSetAndValue = Boolean(data['LED'])
          }
          if (this.pumpSetAndValue !== Boolean(data['pump'])) {
            this.pumpSetAndValue = Boolean(data['pump'])
          }
        }
      }
    },
    // 数据发送
    websocketSend () {
      // this.websock.send('6af6188e14aa')
      this.websock.send(sessionStorage.getItem('chooseDevice'))
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
      upCtrl.append('username', sessionStorage.getItem('username'))
      upCtrl.append('deviceID', sessionStorage.getItem('chooseDevice'))
      //  upCtrl.append('username', '1399472680@qq.com')
      //  upCtrl.append('deviceID', '6af6188e14aa')
      upCtrl.append('msg', msg)
      console.log(msg)
      // 超时10s
      this.axios.post(data.serverSrc + '/dev/downctrl', upCtrl, {timeout: 1000 * 10}).then(body => {
        console.log(body.data)
        console.log(typeof body.data)
        var infoMsg = '提交成功'
        if (body.data === 'recvice error') {
          infoMsg = '下行异常'
        } else if (body.data === 'time out') {
          infoMsg = '下行响应超时'
        }
        this.fullscreenLoading = !this.fullscreenLoading
        this.$notify.info({
          title: '消息',
          message: infoMsg
        })
      }).catch(() => {
        console.log('出错')
        this.fullscreenLoading = !this.fullscreenLoading
        this.$notify.error({
          title: '消息',
          message: '操作失败'
        })
      })
    },
    // 数值类型
    commitNutrientToServer () {
      this.nutrientNotEdit = !this.nutrientNotEdit
      this.fullscreenLoading = !this.fullscreenLoading
      console.log('commitNutrientToServer')
      var newNutrient = parseFloat(this.nutrientSet)
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
      var newLight = parseFloat(this.lightSet)
      console.log(newLight)
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
      var newPh = parseFloat(this.phSet)
      console.log(newPh)
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
      this.editObjectName = 'fan'
      var msg = JSON.stringify({
        'fan': this.fanSetAndValue ? 1 : 0
      })
      this.commitToServer(msg)
    },
    commitLedToServer () {
      this.fullscreenLoading = !this.fullscreenLoading
      this.editObjectName = 'LED'
      var msg = JSON.stringify({
        'LED': this.ledSetAndValue ? 1 : 0
      })
      this.commitToServer(msg)
    },
    commitPumpToServer () {
      this.fullscreenLoading = !this.fullscreenLoading
      this.editObjectName = 'pump'
      var msg = JSON.stringify({
        'pump': this.pumpSetAndValue ? 1 : 0
      })
      this.commitToServer(msg)
    }
  }
}
</script>

<style scoped>
  @import "../../style/module.css";
  .box-card {
    margin-bottom: 20px;
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
    margin-top: 10px;
    font-size: 23px;
    color: black;
    border-radius: 5px;
    border: 1px solid #d9ecff;
  }
  .deviceSettings-input .box-card input:disabled {
    background:none;
    outline:none;
    border:none;
    font-size: 25px;
    color: white;
  }
</style>
