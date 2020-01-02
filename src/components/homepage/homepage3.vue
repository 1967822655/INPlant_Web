<template>
  <div class="module">
    <div class="module-title">
      <p>阈值设置</p>
    </div>
    <el-divider></el-divider>
    <div class="module-content">
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
          <el-input-number v-model="dialogForm.thresholdMax" :precision="2" :step="0.1" style="width: 60%"
                           :max="dialogForm.max" :min="dialogForm.min"></el-input-number>
        </el-form-item>
        <el-form-item label="阈值下限" :label-width="formLabelWidth">
          <el-input-number v-model="dialogForm.thresholdMin" :precision="2" :step="0.1" style="width: 60%"
                           :max="dialogForm.max" :min="dialogForm.min"></el-input-number>
        </el-form-item>
        <span class="thresholdSetting-error" :label-width="formLabelWidth">{{thresholdInputError}}</span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update " :loading="isUpLoading">{{isUpLoading ?  '更新中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
    <div>
  </div>
  </div>
</template>

<script>
import data from '../cache'
export default {
  name: 'homepage3',
  methods: {
    // 将表格中row行数据显示在dialog中
    edit (index, row) {
      this.dialogForm.valueName = row.valueName
      this.dialogForm.unitName = row.unitName
      this.dialogForm.min = row.min
      this.dialogForm.max = row.max
      this.dialogForm.index = index
      //  console.log(row.thresholdMin === '-')
      //  console.log(row.thresholdMax === '-')
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
      //   console.log(this.dialogForm)
      this.dialogFormVisible = true
    },
    /**
     *   dialog提交设置
     *   1.成功 -> getThresholdFromServer
     *   2.报错
     * */
    update () {
      var i = this.dialogForm.index
      var type = ''
      switch (i) {
        case 0: type = 'temp'
          break
        case 1: type = 'rh'
          break
        case 2: type = 'co2'
          break
        case 3: type = 'light'
          break
        case 4: type = 'ph'
          break
        case 5: type = 'ec'
          break
      }
      var upCtrl = new FormData()
      upCtrl.append('deviceID', sessionStorage.getItem('chooseDevice'))
      upCtrl.append('type', type)
      if (this.dialogForm.thresholdMax !== undefined &&
        this.dialogForm.thresholdMin !== undefined &&
        this.dialogForm.thresholdMax < this.dialogForm.thresholdMin) {
        this.thresholdInputError = '上限值应该大于下限值'
        return
      }
      //  +防止空值处理
      if (this.dialogForm.thresholdMax !== undefined) {
        upCtrl.append('max', this.dialogForm.thresholdMax.toString())
      } else {
        upCtrl.append('max', 'null')
        console.log('max: null')
      }
      if (this.dialogForm.thresholdMin !== undefined) {
        upCtrl.append('min', this.dialogForm.thresholdMin.toString())
      } else {
        upCtrl.append('min', 'null')
        console.log('min: null')
      }
      console.log(type)
      console.log('max: ' + this.dialogForm.thresholdMax)
      console.log('min: ' + this.dialogForm.thresholdMin)
      this.isUpLoading = true
      this.axios.post(data.serverSrc + '/dev/changethreshold', upCtrl, {timeout: 1000 * 10}).then(body => {
        console.log('返回值是：')
        console.log(body.data)
        this.isUpLoading = false
        if (body.data === 'success') {
          this.getThresholdFromServer()
          this.dialogFormVisible = false
        } else {
          this.dialogFormVisible = false
          this.$notify.info({
            title: '消息',
            message: '输入错误'
          })
        }
      }).catch(() => {
        this.isUpLoading = false
        this.dialogFormVisible = false
        this.$notify.error({
          title: '消息',
          message: '上交超时'
        })
      })
    },
    //  在同步服务器数据之前初始化
    beforeGetFromServer () {
      this.thresholdTableData.forEach(item => {
        item.thresholdMax = '-'
        item.thresholdMin = '-'
      })
      this.isUpLoading = false
      this.thresholdInputError = ''
      this.loadingTableData = true
    },
    //  同步服务器数据
    getThresholdFromServer () {
      this.beforeGetFromServer()
      var upCtrl = new FormData()
      upCtrl.append('deviceID', sessionStorage.getItem('chooseDevice'))
      this.axios.post(data.serverSrc + '/dev/getthreshold', upCtrl, {timeout: 1000 * 10}).then(body => {
        console.log(body.data)
        if (body.data['tempmax'] !== null) {
          this.thresholdTableData[0].thresholdMax = body.data['tempmax']
        }
        if (body.data['tempmin'] !== null) {
          this.thresholdTableData[0].thresholdMin = body.data['tempmin']
        }
        if (body.data['rhmax'] !== null) {
          this.thresholdTableData[1].thresholdMax = body.data['rhmax']
        }
        if (body.data['rhmin'] !== null) {
          this.thresholdTableData[1].thresholdMin = body.data['rhmin']
        }
        if (body.data['co2max'] !== null) {
          this.thresholdTableData[2].thresholdMax = body.data['co2max']
        }
        if (body.data['co2min'] !== null) {
          this.thresholdTableData[2].thresholdMin = body.data['co2min']
        }
        if (body.data['lightmax'] !== null) {
          this.thresholdTableData[3].thresholdMax = body.data['lightmax']
        }
        if (body.data['lightmin'] !== null) {
          this.thresholdTableData[3].thresholdMin = body.data['lightmin']
        }
        if (body.data['phmax'] !== null) {
          this.thresholdTableData[4].thresholdMax = body.data['phmax']
        }
        if (body.data['phmin'] !== null) {
          this.thresholdTableData[4].thresholdMin = body.data['phmin']
        }
        if (body.data['ecmax'] !== null) {
          this.thresholdTableData[5].thresholdMax = body.data['ecmax']
        }
        if (body.data['ecmin'] !== null) {
          this.thresholdTableData[5].thresholdMin = body.data['ecmin']
        }
        this.loadingTableData = false
      }).catch(e => {
        this.loadingTableData = false
        this.$notify.error({
          title: '消息',
          message: '同步数据超时'
        })
      })
    }
  },
  mounted () {
    console.log('加载数据到thresholdTableData中')
    this.getThresholdFromServer()
  },
  data () {
    return {
      loadingTableData: true,
      thresholdTableData: [{
        valueName: '温度',
        thresholdMin: '-',
        thresholdMax: '-',
        unitName: '°C',
        max: 100000000,
        min: -100000000
      }, {
        valueName: '湿度',
        thresholdMin: '-',
        thresholdMax: '-',
        unitName: '%',
        max: 100,
        min: 0
      }, {
        valueName: 'CO2浓度',
        thresholdMin: '-',
        thresholdMax: '-',
        unitName: 'ppm',
        max: 100000000,
        min: 0
      }, {
        valueName: '光照',
        thresholdMin: '-',
        thresholdMax: '-',
        unitName: 'lux',
        max: 100000000,
        min: 0
      }, {
        valueName: '酸碱度',
        thresholdMin: '-',
        thresholdMax: '-',
        unitName: '-',
        max: 14,
        min: 0
      }, {
        valueName: '营养液浓度',
        thresholdMin: '-',
        thresholdMax: '-',
        unitName: 'us/cm',
        max: 100000000,
        min: 0
      }],
      dialogFormVisible: false,
      dialogForm: {
        valueName: '',
        thresholdMin: '',
        thresholdMax: '',
        unitName: '',
        max: 0,
        min: 0,
        index: -1
      },
      formLabelWidth: '100px',
      thresholdInputError: '',
      isUpLoading: false,
      data2: [
        {
          label: '平台名称',
          porp: 'platForm'
        },
        {label: '版本', porp: 'version'},
        {label: '菜单', porp: 'view'},
        {label: '子菜单', porp: 'sonView'},
        {label: '菜单点击次数', porp: 'clickNumber'},
        {label: '菜单点击人数', porp: 'clickPopleNumber'},
        {label: '人均点击次数', porp: 'clickFlatNumber'}
      ],
      tableData2: [
        {
          platForm: '1',
          version: '2',
          view: '智慧服务',
          sonView: '当天挂号',
          clickNumber: '1',
          clickPopleNumber: '2',
          clickFlatNumber: '3'
        },
        {
          platForm: '',
          version: '',
          view: '',
          sonView: '预约挂号',
          clickNumber: '1',
          clickPopleNumber: '2',
          clickFlatNumber: '3'
        },
        {
          platForm: '',
          version: '',
          view: '',
          sonView: '智能就医助手',
          clickNumber: '4',
          clickPopleNumber: '5',
          clickFlatNumber: '6'
        },
        {
          platForm: '1',
          version: '2',
          view: '智慧服务',
          sonView: '当天挂号',
          clickNumber: '1',
          clickPopleNumber: '2',
          clickFlatNumber: '3'
        },
        {
          platForm: '',
          version: '',
          view: '',
          sonView: '预约挂号',
          clickNumber: '1',
          clickPopleNumber: '2',
          clickFlatNumber: '3'
        },
        {
          platForm: '',
          version: '',
          view: '',
          sonView: '智能就医助手',
          clickNumber: '4',
          clickPopleNumber: '5',
          clickFlatNumber: '6'
        },
        {
          platForm: '1',
          version: '2',
          view: '智慧服务',
          sonView: '当天挂号',
          clickNumber: '1',
          clickPopleNumber: '2',
          clickFlatNumber: '3'
        },
        {
          platForm: '',
          version: '',
          view: '',
          sonView: '预约挂号',
          clickNumber: '1',
          clickPopleNumber: '2',
          clickFlatNumber: '3'
        },
        {
          platForm: '',
          version: '',
          view: '',
          sonView: '智能就医助手',
          clickNumber: '4',
          clickPopleNumber: '5',
          clickFlatNumber: '6'
        },
        {
          platForm: '1',
          version: '2',
          view: '智慧服务',
          sonView: '当天挂号',
          clickNumber: '1',
          clickPopleNumber: '2',
          clickFlatNumber: '3'
        },
        {
          platForm: '',
          version: '',
          view: '',
          sonView: '预约挂号',
          clickNumber: '1',
          clickPopleNumber: '2',
          clickFlatNumber: '3'
        },
        {
          platForm: '',
          version: '',
          view: '',
          sonView: '智能就医助手',
          clickNumber: '4',
          clickPopleNumber: '5',
          clickFlatNumber: '6'
        }],
      temp: [3, 3, 2],
      sum: 0,
      pointer: 0
    }
  }
}
</script>

<style scoped>
  @import "../../style/module.css";
  el-dialog el-input {
    color: black;
    -webkit-text-fill-color: #7d7e80;
    -webkit-opacity: 1;
    opacity: 1;
    /*默认的不透明级别为0.3*/
    background-color: #fff;
  }
  .thresholdSetting-error {
    color: red;
  }
</style>
