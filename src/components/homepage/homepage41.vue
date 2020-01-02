<template>
  <div class="module">
    <div class="module-title">
      <p>训练模型</p>
    </div>
    <el-divider></el-divider>
    <div class="module-content">
      <el-table
        :data="modelTrainingTableData">
        <el-table-column
          prop="date"
          label="时间"
          align="center">
<!--          <template slot-scope="scope">-->
<!--            <el-input size="small" v-model="scope.row.date"-->
<!--                      placeholder="请输入内容"></el-input>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column
          label="生长率"
          align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.growthRate"
                      placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-plus"
              @click="handlePlus(scope.$index, scope.row)">添加</el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="modelTraining-upload">
        <el-progress id="modelTraining-progress" :text-inside="true" :stroke-width="26"
                     :percentage="upProgress" v-show="upProgress > 0 ? true : false"></el-progress>
        <el-button id="modelTraining-commit" type="primary" icon="el-icon-s-promotion" @click="handleCommit">训练</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import data from '../cache'
export default {
  name: 'homepage41',
  created () {
    var device = new FormData()
    device.append('deviceID', sessionStorage.getItem('chooseDevice'))
    this.showAllTrainData(device)
  },
  methods: {
    handleDelete (index, row) {
      console.log(index)
      console.log(row)
      this.modelTrainingTableData.splice(index, 1)
    },
    handlePlus (index, row) {
      console.log(index)
      console.log(row)
      var newRow = {
        growthRate: '0'
      }
      if (index === 0 && row.date[1] !== '1') {
        newRow.date = '第1天'
        this.modelTrainingTableData.splice(0, 0, newRow)
      } else {
        newRow.date = '第' + String(parseInt(row.date[1]) + 1) + '天'
        this.modelTrainingTableData.splice(index + 1, 0, newRow)
      }
    },
    handleCommit () {
      console.log('提交，处理数据')
      var timeId = setInterval(() => {
        this.upProgress += 20
      }, 1000)
      setTimeout(() => {
        clearInterval(timeId)
      }, 5000)
    },
    showAllTrainData (device) {
      this.axios.post(data.serverSrc + '/traindata/showall', device).then(body => {
        console.log(body)
      })
    }
  },
  data () {
    return {
      modelTrainingTableData: [{
        date: '第1天',
        growthRate: '0'
      }, {
        date: '第2天',
        growthRate: '0'
      }, {
        date: '第3天',
        growthRate: '0'
      }, {
        date: '第4天',
        growthRate: '0'
      }, {
        date: '第5天',
        growthRate: '0'
      }, {
        date: '第6天',
        growthRate: '0'
      }],
      upProgress: 0
    }
  }
}
</script>

<style scoped>
  @import "../../style/module.css";
  .modelTraining-upload {
    width: 100%;
    position: relative;
    margin-top: 20px;
  }
  #modelTraining-commit {
    right: 0;
    position: absolute;
    width: 10%;
  }
  #modelTraining-progress {
    width: 50%;
    position: absolute;
    left: 0;
    margin-top: 10px;
  }
</style>
