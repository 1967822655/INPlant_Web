<template>
  <div class="module" style="min-width: 1100px;">
    <div class="module-title">
      <p>训练模型</p>
    </div>
    <el-divider></el-divider>
    <div class="module-content">
      <el-table
        :data="modelTrainingTableData">
        <el-table-column
          prop="traindataKey.days"
          label="时间"
          align="center">
          <template slot-scope="scope">
            第{{scope.row.traindataKey.days}}天
          </template>
        </el-table-column>
        <el-table-column
          prop="ec"
          label="ec"
          align="center">
        </el-table-column>
        <el-table-column
          prop="light"
          label="light"
          align="center">
        </el-table-column>
        <el-table-column
          prop="lighttime"
          label="lighttime"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ph"
          label="ph"
          align="center">
        </el-table-column>
        <el-table-column
          prop="rh"
          label="rh"
          align="center">
        </el-table-column>
        <el-table-column
          prop="temp"
          label="temp"
          align="center">
        </el-table-column>
        <el-table-column
          prop="co2"
          label="co2"
          align="center">
        </el-table-column>
        <el-table-column
          label="生长率"
          align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.cgr"
                      placeholder="请输入内容">{{scope.row.cgr}}</el-input>
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
            @click="upDateCgr(scope.row)">添加</el-button>
        </template>
      </el-table-column>
      </el-table>
      <div class="modelTraining-upload">
        {{upProgress}}
        <el-input class="modelTraining-commit width150" size="small" v-model="upProgress.startDay"
                  placeholder="请输入开始日期">{{upProgress.startDay}}</el-input>
        <div class="modelTraining-commit">-</div>
        <el-input class="modelTraining-commit width150" size="small" v-model="upProgress.endDay"
                  placeholder="请输入截止日期">{{upProgress.endDay}}</el-input>
        <el-button class="modelTraining-commit" type="primary" icon="el-icon-s-promotion" @click="handleCommit">训练</el-button>
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
    // 训练天数
    handleCommit () {
      if (parseInt(this.upProgress.startDay) < parseInt(this.upProgress.endDay)) {
        this.upProgress.array = []
        for (let i = parseInt(this.upProgress.startDay); i <= parseInt(this.upProgress.endDay); i++) {
          this.upProgress.array.push(i)
          console.log(i)
        }
        var temp = new FormData()
        temp.append('days', this.upProgress.array)
        console.log(sessionStorage.getItem('username'))
        console.log(sessionStorage.getItem('chooseDevice'))
        temp.append('username', sessionStorage.getItem('username'))
        temp.append('deviceID', sessionStorage.getItem('chooseDevice'))
        this.axios.put(data.serverSrc + '/traindata/starttrain', temp).then(body => {
          console.log(body)
        })
      } else {
        this.$message.error('请输入正确的天数')
      }
    },
    // 展示全部数据
    showAllTrainData (device) {
      this.axios.post(data.serverSrc + '/traindata/showall', device).then(body => {
        this.modelTrainingTableData = body.data
      })
    },
    upDateCgr (sourse) {
      if (sourse.cgr) {
        var temp = new FormData()
        temp.append('deviceID', sessionStorage.getItem('chooseDevice'))
        temp.append('day', sourse.traindataKey.days)
        temp.append('Cgr', sourse.cgr)
        console.log(data.serverSrc)
        this.axios.post(data.serverSrc + '/traindata/updatecgr', temp).then(body => {
          if (body.data === 'success') {
            this.$message.success('上传成功')
          } else {
            this.$message.error('上传失败')
          }
        })
      } else {
        this.$message.error('参数不能为空')
      }
    }
  },
  data () {
    return {
      modelTrainingTableData: [],
      upProgress: {
        startDay: null,
        endDay: null,
        array: []
      }
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
  .modelTraining-commit {
    float: left;
    margin-left: 10px;
    margin-right: 10px;
  }
  .width150 {
    width: 150px;
  }
</style>
