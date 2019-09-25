<template>
  <div id="thresholdSetting">
    <div class="thresholdSetting-title">
      <p>阈值设置</p>
    </div>
    <el-divider></el-divider>
    <div class="thresholdSetting-content">
      <el-table
        v-loading="loadingTableData"
        :data="thresholdTableData">
        <el-table-column
          prop="valueName"
          label="名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="thresholdMin"
          label="阈值下限"
          align="center">
        </el-table-column>
        <el-table-column
          prop="thresholdMax"
          label="阈值上限"
          align="center">
        </el-table-column>
        <el-table-column
          prop="unitName"
          label="单位"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button @click="edit (scope.$index, scope.row)" type="primary" icon="el-icon-edit" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!--    弹窗-->
    <el-dialog title="阈值设置" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" :label-position="'left'">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.valueName" disabled></el-input>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.unitName" disabled></el-input>
<!--          <label >{{dialogForm.unitName}}</label>-->
        </el-form-item>
        <el-form-item label="阈值上限" :label-width="formLabelWidth">
<!--          或者用滑块slide-->
          <el-input-number v-model="dialogForm.thresholdMax" :precision="2" :step="0.1"
                           :max="dialogForm.max" :min="dialogForm.min"></el-input-number>
        </el-form-item>
        <el-form-item label="阈值下限" :label-width="formLabelWidth">
          <el-input-number v-model="dialogForm.thresholdMin" :precision="2" :step="0.1"
                           :max="dialogForm.max" :min="dialogForm.min"></el-input-number>
        </el-form-item>
        <span class="thresholdSetting-error" :label-width="formLabelWidth">{{thresholdInputError}}</span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update " :loading="isUpLoading">{{isUpLoading ?  '更新中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'homepage4',
  methods: {
    edit (index, row) {
      this.dialogForm.valueName = row.valueName
      this.dialogForm.unitName = row.unitName
      this.dialogForm.min = row.min
      this.dialogForm.max = row.max
      this.dialogForm.index = index
      console.log(row.thresholdMin === '-')
      console.log(row.thresholdMax === '-')
      if (row.thresholdMin === '-') {
        this.dialogForm.thresholdMin = row.min
      } else {
        this.dialogForm.thresholdMin = row.thresholdMin
      }
      if (row.thresholdMax === '-') {
        this.dialogForm.thresholdMax = row.max
      } else {
        this.dialogForm.thresholdMax = row.thresholdMax
      }
      console.log(this.dialogForm)
      this.dialogFormVisible = true
    },
    update () {
      var i = this.dialogForm.index
      if (this.dialogForm.thresholdMin) {
        this.thresholdTableData[i].thresholdMin = this.dialogForm.thresholdMin
      } else {
        this.thresholdTableData[i].thresholdMin = '-'
      }
      if (this.dialogForm.thresholdMax) {
        this.thresholdTableData[i].thresholdMax = this.dialogForm.thresholdMax
      } else {
        this.thresholdTableData[i].thresholdMax = '-'
      }
      this.isUpLoading = true
      setTimeout(() => {
        this.isUpLoading = false
        this.dialogFormVisible = false
      }, 2000)
    }
  },
  created () {
    console.log('加载数据到thresholdTableData中')
    setTimeout(() => {
      this.loadingTableData = false
    }, 1000)
  },
  data () {
    return {
      loadingTableData: true,
      thresholdTableData: [{
        valueName: '温度',
        thresholdMin: '1',
        thresholdMax: '2',
        unitName: '°C',
        max: 2,
        min: 1
      }, {
        valueName: '湿度',
        thresholdMin: '3',
        thresholdMax: '-',
        unitName: '%',
        max: 9,
        min: 1
      }, {
        valueName: 'CO2浓度',
        thresholdMin: '-',
        thresholdMax: '4',
        unitName: 'ppm',
        max: 5,
        min: 1
      }, {
        valueName: '光照',
        thresholdMin: '-',
        thresholdMax: '4',
        unitName: 'lux',
        max: 5,
        min: 1
      }, {
        valueName: '酸碱度',
        thresholdMin: '-',
        thresholdMax: '5',
        unitName: '-',
        max: 8,
        min: 1
      }, {
        valueName: '营养液浓度',
        thresholdMin: '6',
        thresholdMax: '7',
        unitName: 'us/cm',
        max: 10,
        min: 1
      }],
      dialogFormVisible: false,
      dialogForm: {
        valueName: '',
        thresholdMin: '',
        thresholdMax: '',
        unitName: '',
        max: 2,
        min: 1,
        index: -1
      },
      formLabelWidth: '100px',
      thresholdInputError: '',
      isUpLoading: false
    }
  }
}
</script>

<style scoped>
  #thresholdSetting {
    background: white;
    width: 100%;
    margin: 5px;
    padding: 20px;
  }
  #thresholdSetting .thresholdSetting-content {
    width: 100%;
  }
  #thresholdSetting .thresholdSetting-content > el-table{
    width: 100%;
  }
  .thresholdSetting-content > el-table > el-table-column {
    width: 20%;
  }
  el-dialog el-input {
    color: black;
    -webkit-text-fill-color: #7d7e80;
    -webkit-opacity: 1;
    opacity: 1;  //默认的不透明级别为0.3
    background-color: #fff;
  }
  .thresholdSetting-error {
    color: red;
  }
</style>
