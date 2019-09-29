<template>
  <div style="width: 100%">
    <div>实时数据</div>
    <div style="height: 300px;width: 100%;background-color: white">

    </div>
    <div id="realTimeTable" style="height: 600px; width: 100%"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'homepage11',
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
  },
  destroyed: function () {
    clearInterval(this.test)// 离开改层时执行
  },
  methods: {
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
