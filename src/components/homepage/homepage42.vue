<template>
  <div class="module">
    <div class="module-title">
      <p>模型预测</p>
    </div>
    <el-divider></el-divider>
    <div class="module-content">
      <div class="modelPredictions-have">
        <div class="modelPredictions-models">
          <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="(item, index) in modelPredictionsList" :key="index">
              <h3 class="medium" @click="modelHandle(index)">{{ item.name + '/' + item.sample}}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-if="count>0 ? true : false" class="modelPredictions-Prediction"
          style="margin: 20px 0px;">
          <div class="modelPredictions-Prediction-title">
            <p >预测模块</p>
          </div>
          <el-divider></el-divider>
          <div class="modelPredictions-Prediction-content"
                style="width: 50%;
                margin-left:25%;">
            <el-form :model="formData" :label-position="'left'">
              <el-form-item label="CO2浓度" :label-width="'100px'">
                <el-input v-model="formData.carbonDioxide"></el-input>
              </el-form-item>
              <el-form-item label="湿度" :label-width="'100px'">
                <el-input v-model="formData.humidty"></el-input>
              </el-form-item>
              <el-form-item label="温度" :label-width="'100px'">
                <el-input v-model="formData.temperature"></el-input>
              </el-form-item>
              <el-form-item label="光照" :label-width="'100px'">
                <el-input v-model="formData.beam"></el-input>
              </el-form-item>
              <el-form-item label="营养液浓度" :label-width="'100px'">
                <el-input v-model="formData.nutrient"></el-input>
              </el-form-item>
              <el-form-item label="PH值" :label-width="'100px'">
                <el-input v-model="formData.pH"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" icon="el-icon-s-promotion" @click="makePrediction()"
                  style="float: right;">立即预测</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--<div style="background-color:gray;">预测结果</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
export default {
  components: {ElButton},
  name: 'homepage42',
  methods: {
    modelHandle (index) {
      console.log('添加模型')
      console.log(index)
    },
    makePrediction () {
      console.log('makePrediction')
    }
  },
  data () {
    return {
      modelPredictionsList: [{
        name: '模型1',
        sample: 9
      }, {
        name: '+',
        sample: 0
      }],
      count: 1,
      formData: {
        carbonDioxide: '',
        humidty: '',
        temperature: '',
        nutrient: '',
        pH: '',
        beam: ''
      }
    }
  }
}
</script>

<style scoped>
  @import "../../style/module.css";
  .module .module-content .modelPredictions-models {
    height: 60%;
    width: 100%;
  }
  .module .module-content .modelPredictions-Prediction {
    height: 40%;
    width: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
