<template>
  <div style="width: 100%">
    <div>实时数据</div>
    <div class="dataBox">
      <div class="row">
        <div class="col">
          <p class="word">空气温度：</p>
          <div class="data">{{this.temperature[this.temperature.length-1]}}℃</div>
        </div>
        <div class="col">
          <p class="word">空气湿度：</p>
          <div class="data">{{this.humidity[this.humidity.length-1]}}%</div>
        </div>
        <div class="col">
          <p class="word">光照强度：</p>
          <div class="data">{{this.light[this.light.length-1]}}LUX</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="word">可溶盐浓度：</p>
          <div class="data">{{this.nutrientConcentration[this.nutrientConcentration.length-1]}}mS/cm</div>
        </div>
        <div class="col">
          <p class="word">ph值：</p>
          <div class="data">{{this.ph[this.ph.length-1]}}</div>
        </div>
        <div class="col">
          <p class="word">二氧化碳浓度：</p>
          <div class="data">{{this.CO2concentration[this.CO2concentration.length-1]}}PPM</div>
        </div>
      </div>
    </div>
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
      nutrientConcentration: [] // 可溶盐浓度
    }
  },
  created () {
  },
  mounted () {
    this.username = sessionStorage.getItem('username')
    // 拦截器
    // if (!this.username || this.username === 'null') {
    // }
    // websocket初始化
    this.initWebSocket()
    this.realTimeEcharts()
    // this.sendDevName(sessionStorage.getItem('chooseDevice'))
  },
  // 离开该层时执行
  destroyed: function () {
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
      // this.websocketSend(sessionStorage.getItem('chooseDevice'))
    },
    // 连接建立
    websocketOnOpen () {
      console.log('初始化成功')
      this.sendDevName(sessionStorage.getItem('chooseDevice'))
    },
    // 连接建立失败重连
    websocketOnError () {
      // 断线重连
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
      if (this.time.length > 20) {
        this.time.splice(0, 1)
        this.temperature.splice(0, 1)
        this.humidity.splice(0, 1)
        this.CO2concentration.splice(0, 1)
        this.light.splice(0, 1)
        this.ph.splice(0, 1)
      }
      this.nutrientConcentration.push(data.ec)
      this.realTimeEcharts()
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
    sendDevName (chooseDevice) {
      // let actions = {'devName': devName}
      // console.log(actions)
      // this.websocketSend(JSON.stringify(actions))
      console.log(chooseDevice)
      this.websocketSend(chooseDevice)
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
  .dataBox {
    height: 300px;
    width: 100%;
    background-color: white;
  }
  .row {
    display: flex;
    height: 50%;
    width: 100%;
  }
  .col {
    width: 33.33%;
  }
  .word {
    font-size: 18px;
  }
  .data {
    font-weight: bold;
    font-size: 45px;
  }
</style>
