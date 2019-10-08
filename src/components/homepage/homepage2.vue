<template>
  <div id="deviceSettings">
    <div class="deviceSettings-title">
      <p>设备调节</p>
    </div>
    <el-divider></el-divider>
    <div class="deviceSettings-content" v-loading.fullscreen.lock="fullscreenLoading">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <el-tag class="card-name">营养液浓度(us/cm)</el-tag>
            <i class="el-icon-edit-outline card-edit" v-show="nutrientNotEdit" @click="nutrientNotEdit = !nutrientNotEdit"></i>
            <i class="el-icon-finished card-edit" v-show="!nutrientNotEdit" @click="commitNutrientToServer()"></i>
            <i class="el-icon-close card-edit" v-show="!nutrientNotEdit" @click="nutrientNotEdit = !nutrientNotEdit"></i>
            <div class="block card-content">
              <el-input
                placeholder="请输入内容"
                type="number"
                v-model="nutrientSet"
                :disabled="nutrientNotEdit">
              </el-input>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <el-tag class="card-name">风扇</el-tag>
            <i class="el-icon-setting card-edit" @click="fanNotEdit = !fanNotEdit"></i>
            <div class="block card-content">
              <el-switch
                v-model="fanSetAndValue"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :disabled="fanNotEdit"
                @change="commitFanToServer()">
              </el-switch>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <el-tag class="card-name">LED灯</el-tag>
            <i class="el-icon-setting card-edit"  @click="lightNotEdit = !lightNotEdit"></i>
            <div class="block card-content">
              <el-switch
                v-model="lightSetAndValue"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :disabled="lightNotEdit"
                @change="commitLightToServer()">
              </el-switch>
            </div>
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
    //    load data of nutrient light fan
    // websocket初始化
    this.initWebSocket()
  },
  data () {
    return {
      nutrientValue: 0,
      nutrientSet: 0,
      fanSetAndValue: false,
      lightSetAndValue: false,
      nutrientNotEdit: true,
      fanNotEdit: true,
      lightNotEdit: true,
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
      this.websocketSend()
    },
    // 连接建立
    websocketOnOpen () {
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
        this.nutrientSet = data.ec
        this.nutrientValue = data.ec
        this.fanSetAndValue = Boolean(data['fan'])
        this.fanSetAndValue = Boolean(data['LED'])
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
    commitNutrientToServer () {
      this.fullscreenLoading = !this.fullscreenLoading
      console.log('commitNutrientToServer')
      var newNutrient = parseInt(this.nutrientSet)
      if (newNutrient >= 0 && newNutrient <= 4400) {
        console.log(newNutrient)
        var msg = JSON.stringify({
          'ec': newNutrient
        })
        console.log(msg)
        let newNutrientCtl = new FormData()
        newNutrientCtl.append('username', '1399472680@qq.com')
        newNutrientCtl.append('deviceID', '6af6188e14aa')
        newNutrientCtl.append('msg', msg)
        this.axios.post(data.serverSrc + '/dev/downctrl', newNutrientCtl).then(body => {
          console.log(body.data)
          this.fullscreenLoading = !this.fullscreenLoading
          this.nutrientNotEdit = !this.nutrientNotEdit
          //          this.$notify({
          //            title: 'tip-temp',
          //            message: body.data
          //          })
          // type: 'warning' 'error'
        })
      }
    },
    commitFanToServer () {
      this.fullscreenLoading = !this.fullscreenLoading
      console.log('commitFanToServer')
      console.log(this.fanSetAndValue)
      var msg = JSON.stringify({
        'fan': this.fanSetAndValue ? 1 : 0
      })
      console.log(msg)
      let newNutrientCtl = new FormData()
      newNutrientCtl.append('username', '1399472680@qq.com')
      newNutrientCtl.append('deviceID', '6af6188e14aa')
      newNutrientCtl.append('msg', msg)
      this.axios.post(data.serverSrc + '/dev/downctrl', newNutrientCtl).then(body => {
        console.log(body.data)
        this.fullscreenLoading = !this.fullscreenLoading
        this.fanNotEdit = !this.fanNotEdit
        //        this.$notify({
        //          title: 'tip-temp',
        //          message: body.data
        //        })
      })
    },
    commitLightToServer () {
      this.fullscreenLoading = !this.fullscreenLoading
      console.log('commitLightToServer')
      console.log(this.lightSetAndValue)
      var msg = JSON.stringify({
        'LED': this.lightSetAndValue ? 1 : 0
      })
      console.log(msg)
      let newNutrientCtl = new FormData()
      newNutrientCtl.append('username', '1399472680@qq.com')
      newNutrientCtl.append('deviceID', '6af6188e14aa')
      newNutrientCtl.append('msg', msg)
      this.axios.post(data.serverSrc + '/dev/downctrl', newNutrientCtl).then(body => {
        console.log(body.data)
        this.fullscreenLoading = !this.fullscreenLoading
        this.lightNotEdit = !this.lightNotEdit
        //        this.$notify({
        //          title: 'tip-temp',
        //          message: body.data
        //        })
      })
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
  .deviceSettings-content .box-card {
    height: 200px;
    background-color: gainsboro;
  }
  .box-card el-card__body {
    height: 100%;
  }
  .box-card .card-name {
    border: none;
  }
  .box-card .card-edit {
    float: right;
    margin-left: 10px;
    font-size: 1.5em;
  }
  .box-card .card-content {
    height: 150px;
    float: right;
  }
  .box-card .card-content .el-input input{
    margin-top: 100px;
    outline: none;
    color: black;
  }
  .box-card .card-content .el-input input:disabled {
    margin-top: 130px;
    outline: none;
    color: black;
  }
  .box-card .card-content .el-switch {
    margin-top: 130px;
    margin-right: 0;
  }
</style>
