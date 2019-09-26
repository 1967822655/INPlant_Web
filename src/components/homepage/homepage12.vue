<template>
  <div style="width: 100%">
    <div>历史数据</div>
    <div id="historyTable" style="height: 600px; width: 100%"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'homepage12',
  data () {
    return {
      date: [1, 2, 3, 4, 5, 6, 7],
      temperature: [120, 132, 101, 134, 90, 230, 210],
      humidity: [320, 332, 301, 334, 390, 330, 320],
      CO2concentration: [220, 182, 191, 234, 290, 330, 310],
      light: [150, 232, 201, 154, 190, 330, 410],
      ph: [820, 932, 901, 934, 1290, 1330, 1320],
      nutrientConcentration: [999, 1020, 528, 287, 398, 873, 256]
    }
  },
  mounted () {
    this.historyEcharts()
  },
  methods: {
    historyEcharts () {
      var myChart = echarts.init(document.getElementById('historyTable'))
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
          data: this.date
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
