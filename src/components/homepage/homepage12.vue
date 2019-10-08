<template>
  <div style="width: 100%">
    <div>实时数据</div>
    <div style="height: 300px;width: 100%;background-color: white">

    </div>
    <button @click="sendDevName()">设备1发送</button>
    <div id="realTimeTable" style="height: 600px; width: 100%"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'homepage12',
  data () {
    return {
      username: null,
      time: [], // 时间
      temperature: [], // 空气温度
      humidity: [], // 空气湿度
      CO2concentration: [], // 二氧化碳浓度
      light: [], // 光照强度
      ph: [], // ph值
      nutrientConcentration: [], // 可溶盐浓度
      test: null
    }
  },
  mounted () {
    this.username = sessionStorage.getItem('username')
    // 拦截器
    // if (!this.username || this.username === 'null') {
    // }
    this.realTimeEcharts()
    // websocket初始化
    this.initWebSocket()
  },
  // 离开该层时执行
  destroyed: function () {
    // 清除计时器
    clearInterval(this.test)
    // 离开路由之后断开websocket连接
    this.websock.close()
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
    },
    // 连接建立失败重连
    websocketOnError () {
      this.initWebSocket()
    },
    // 数据接收
    websocketOnMessage (e) {
      console.log(e.data)
      let data = JSON.parse(e.data)
      this.time.push(new Date().toString().split('GMT')[0])
      this.temperature.push(data.temperature)
      this.humidity.push(data.humidity)
      this.CO2concentration.push(data.co2)
      this.light.push(data.light_intensity)
      this.ph.push(data.ph)
      this.nutrientConcentration.push(data.ec)
      this.realTimeEcharts()
      // console.log(data.data)
      // if (e.data === 'false') {
      //   console.log('null')
      // } else {
      //   let data = JSON.parse(e.data)
      //   console.log(data)
      //   if (data.devName === this.clickDev) {
      //     this.totalButton = data['devSwitch']
      //     if (data['on-off1'] === 1) {
      //       this.button1 = true
      //     } else {
      //       this.button1 = false
      //     }
      //     if (data['on-off2'] === 1) {
      //       this.button2 = true
      //     } else {
      //       this.button2 = false
      //     }
      //     if (data['on-off3'] === 1) {
      //       this.button3 = true
      //     } else {
      //       this.button3 = false
      //     }
      //     if (data['on-off4'] === 1) {
      //       this.button4 = true
      //     } else {
      //       this.button4 = false
      //     }
      //     if (data['on-off5'] === 1) {
      //       this.button5 = true
      //     } else {
      //       this.button5 = false
      //     }
      //     if (data['on-off6'] === 1) {
      //       this.button6 = true
      //     } else {
      //       this.button6 = false
      //     }
      //     if (data['on-off7'] === 1) {
      //       this.button7 = true
      //     } else {
      //       this.button7 = false
      //     }
      //     if (data['on-off8'] === 1) {
      //       this.button8 = true
      //     } else {
      //       this.button8 = false
      //     }
      //     // this.button1 = data['on-off1']
      //     // this.button2 = data['on-off2']
      //     // this.button3 = data['on-off3']
      //     // this.button4 = data['on-off4']
      //     // this.button5 = data['on-off5']
      //     // this.button6 = data['on-off6']
      //     // this.button7 = data['on-off7']
      //     // this.button8 = data['on-off8']
      //     this.changeTimeEcharts(data)
      //   }
      // }
    },
    // 数据发送
    websocketSend (Data) {
      this.websock.send(Data)
    },
    // 关闭
    websocketClose () {
      console.log('断开连接')
    },
    // 发送设备参数
    sendDevName (devName) {
      // let actions = {'devName': devName}
      // console.log(actions)
      // this.websocketSend(JSON.stringify(actions))
      this.websocketSend('6af6188e14aa')
    },
    realTimeEcharts () {
      var myChart = echarts.init(document.getElementById('realTimeTable'))
      window.onresize = myChart.resize
      var option = {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['温度', '湿度', 'CO2浓度', '光照', '酸碱度', '营养液浓度']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.time
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '温度',
            type: 'line',
            data: this.temperature
          },
          {
            name: '湿度',
            type: 'line',
            data: this.humidity
          },
          {
            name: 'CO2浓度',
            type: 'line',
            data: this.CO2concentration
          },
          {
            name: '光照',
            type: 'line',
            data: this.light
          },
          {
            name: '酸碱度',
            type: 'line',
            data: this.ph
          },
          {
            name: '营养液浓度',
            type: 'line',
            data: this.nutrientConcentration
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
