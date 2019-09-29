<template>
  <div style="width: 100%">
    <div>历史数据</div>
    <div id="historyTable" style="height: 600px; width: 100%"></div>
    <el-table
      :data="tableDataEnd"
      stripe>
      <el-table-column
        prop="name"
        label="时间"
        min-width="100"
        height="150">
        <template slot-scope="scope">
          <span size="small">{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="温度"
        min-width="100"
        height="150">
        <template slot-scope="scope">
          <span size="small">{{scope.row.temperature}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="湿度"
        min-width="100"
        height="150">
        <template slot-scope="scope">
          <span size="small">{{scope.row.humidity}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="CO2浓度"
        min-width="100"
        height="150">
        <template slot-scope="scope">
          <span size="small">{{scope.row.CO2concentration}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="光照"
        min-width="100"
        height="150">
        <template slot-scope="scope">
          <span size="small">{{scope.row.light}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="酸碱度"
        min-width="100"
        height="150">
        <template slot-scope="scope">
          <span size="small">{{scope.row.ph}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="营养液浓度"
        min-width="100"
        height="150">
        <template slot-scope="scope">
          <span size="small">{{scope.row.nutrientConcentration}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8, 12, 16, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems">
      </el-pagination>
    </div>
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
      tableDataBegin: [],
      tableDataName: '',
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 8,
      totalItems: 8,
      filterTableDataEnd: [],
      flag: true
    }
  },
  mounted () {
    this.historyEcharts()
    var testData = {
      time: [1, 2, 3, 4, 5, 6, 7],
      temperature: [120, 132, 101, 134, 90, 230, 210],
      humidity: [320, 332, 301, 334, 390, 330, 320],
      CO2concentration: [220, 182, 191, 234, 290, 330, 310],
      light: [150, 232, 201, 154, 190, 330, 410],
      ph: [820, 932, 901, 934, 1290, 1330, 1320],
      nutrientConcentration: [999, 1020, 528, 287, 398, 873, 256]
    }
    this.openData(testData)
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
    },
    // 分页初始化
    openData (val) {
      if (val) {
        this.tableDataBegin = val.time
        this.totalItems = this.tableDataBegin.length
        if (this.totalItems > this.pageSize) {
          for (let index = 0; index < this.pageSize; index++) {
            this.tableDataEnd.push(this.tableDataBegin[index])
          }
          this.filterTableDataEnd = this.tableDataBegin
          this.totalItems = this.tableDataBegin.length
        } else {
          this.tableDataEnd = this.tableDataBegin
          this.filterTableDataEnd = this.tableDataBegin
          this.totalItems = this.tableDataBegin.length
        }
        console.log('!!!!!!!!!!!', this.tableDataEnd)
      }
    },
    // 分页功能
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      // 需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataEnd)
      } else {
        this.currentChangePage(this.filterTableDataEnd)
      }
    },
    // 组件自带监控当前页码
    currentChangePage (list) {
      let from = (this.currentPage - 1) * this.pageSize
      let to = this.currentPage * this.pageSize
      this.tableDataEnd = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from])
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
