<template>
  <div id="modelPredictions">
    <div class="modelPredictions-title">
      <p>模型预测</p>
    </div>
    <el-divider></el-divider>
    <div class="modelPredictions-content">
      <div class="modelPredictions-have">
        <div class="modelPredictions-models">
          <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="(item, index) in modelPredictionsList" :key="index">
              <h3 class="medium" @click="modelHandle(index)">{{ item.name + '/' + item.sample}}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-if="count>0 ? true : false" class="modelPredictions-Prediction">
          <div class="modelPredictions-Prediction-title">
            <p>预测</p>
          </div>
          <div class="modelPredictions-Prediction-content">
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
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homepage42',
  methods: {
    modelHandle (index) {
      console.log('添加模型')
      console.log(index)
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
  #modelPredictions {
    background: white;
    width: 100%;
    margin: 5px;
    padding: 20px;
    height: 80%;
  }
  #modelPredictions .modelPredictions-title {
  }
  #modelPredictions .modelPredictions-content {
    width: 100%;
    height: 100%;
  }
  #modelPredictions .modelPredictions-content .modelPredictions-models {
    height: 60%;
    width: 100%;
  }
  #modelPredictions .modelPredictions-content .modelPredictions-Prediction {
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
