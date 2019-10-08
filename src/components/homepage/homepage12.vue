<template>
  <div style="width: 100%">
    <div>实时数据</div>
    <div style="height: 300px;width: 100%;background-color: white">

    </div>
    <button @click="sendDevName()">XXXXXXXXXXXXXXxxx</button>
    <div id="realTimeTable" style="height: 600px; width: 100%"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'homepage12',
  data () {
    return {
      time: [1, 2, 3, 4, 5, 6, 7],
      temperature: [120, 132, 101, 134, 90, 230, 210],
      humidity: [320, 332, 301, 334, 390, 330, 320],
      CO2concentration: [220, 182, 191, 234, 290, 330, 310],
      light: [150, 232, 201, 154, 190, 330, 410],
      ph: [820, 932, 901, 934, 1290, 1330, 1320],
      nutrientConcentration: [999, 1020, 528, 287, 398, 873, 256],
      test: null
    }
  },
  mounted () {
    this.realTimeEcharts()
    var _this = this
    this.test = setInterval(function () {
      _this.time.push(_this.time[_this.time.length - 1] + 1)
      _this.temperature.push(_this.temperature[_this.temperature.length - 1] + 1)
      _this.humidity.push(_this.humidity[_this.humidity.length - 1] + 1)
      _this.CO2concentration.push(_this.CO2concentration[_this.CO2concentration.length - 1] + 1)
      _this.light.push(_this.light[_this.light.length - 1] + 1)
      _this.ph.push(_this.ph[_this.ph.length - 1] + 1)
      _this.nutrientConcentration.push(_this.nutrientConcentration[_this.nutrientConcentration.length - 1] + 1)
      _this.realTimeEcharts()
    }, 2000)
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
      console.log(e)
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
      this.websocketSend('zzl')
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
