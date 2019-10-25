<template>
  <el-container style="height: 100%">
    <el-header>
      <el-menu
        class="el-menu-demo"
        background-color="#447ed9"
        text-color="#fff"
        active-text-color="#fff"
        mode="horizontal"
      >
        <div style="float: left;height: 60px;"><img src="../../assets/logo.png" style="height: 40px;width:110px"></div>
        <div style="float: left;color:#fff;height: 60px;line-height: 60px">智能种植系统</div>
        <el-submenu index="1" style="float: right;right: 0px;">
          <template slot="title">
            你好！
          </template>
          <!--          <el-menu-item index="2-1">个人信息</el-menu-item>-->
          <el-menu-item>退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main style="width:100%;height: 100%">
      <div style="height: 50px;width: 200px;padding: 15px">
        <div style="float:left;top: 10px;" class="loader">
          <div class="face">
            <div class="circle"></div>
          </div>
          <div class="face">
            <div class="circle"></div>
          </div>
        </div>
        <span style="float:left;font-size: 40px;margin-left: 20px">实验室</span>
      </div>
      <div style="width:100%;height: 85%">
        <div class="cont">
          <!-- cont inner start -->
          <div class="cont__inner">
            <!-- el start -->
            <div class="el one">
              <div class="el__overflow">
                <div class="el__inner">
                  <div class="el__bg"></div>
                  <div class="el__preview-cont">
                    <h2 class="el__heading"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">番茄</div></div></h2>
                  </div>
                  <div class="el__content">
                    <div class="el__text"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">随你</div></div></div>
                    <div class="el__close-btn"></div>
                  </div>
                </div>
              </div>
              <div class="el__index">
                <div class="el__index-back"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">1</div></div></div>
                <div class="el__index-front">
                  <div class="el__index-overlay" data-index="1"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">1</div></div></div>
                </div>
              </div>
            </div>
            <!-- el end -->
            <!-- el start -->
            <div class="el two">
              <div class="el__overflow">
                <div class="el__inner">
                  <div class="el__bg"></div>
                  <div class="el__preview-cont">
                    <h2 class="el__heading"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">生菜</div></div></h2>
                  </div>
                  <div class="el__content">
                    <div class="el__text"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">随你</div></div></div>
                    <div class="el__close-btn"></div>
                  </div>
                </div>
              </div>
              <div class="el__index">
                <div class="el__index-back"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">2</div></div></div>
                <div class="el__index-front">
                  <div class="el__index-overlay" data-index="2"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">2</div></div></div>
                </div>
              </div>
            </div>
            <!-- el end -->
            <!-- el start -->
            <div class="el three">
              <div class="el__overflow">
                <div class="el__inner">
                  <div class="el__bg"></div>
                  <div class="el__preview-cont">
                    <h2 class="el__heading"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">芹菜</div></div></h2>
                  </div>
                  <div class="el__content">
                    <div class="el__text"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">随你</div></div></div>
                    <div class="el__close-btn"></div>
                  </div>
                </div>
              </div>
              <div class="el__index">
                <div class="el__index-back"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">3</div></div></div>
                <div class="el__index-front">
                  <div class="el__index-overlay" data-index="3"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">3</div></div></div>
                </div>
              </div>
            </div>
            <!-- el end -->
            <!-- el start -->
            <div class="el four">
              <div class="el__overflow">
                <div class="el__inner">
                  <div class="el__bg"></div>
                  <div class="el__preview-cont">
                    <h2 class="el__heading"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">苦瓜</div></div></h2>
                  </div>
                  <div class="el__content">
                    <div class="el__text"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">随你</div></div></div>
                    <div class="el__close-btn"></div>
                  </div>
                </div>
              </div>
              <div class="el__index">
                <div class="el__index-back"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">4</div></div></div>
                <div class="el__index-front">
                  <div class="el__index-overlay" data-index="4"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">4</div></div></div>
                </div>
              </div>
            </div>
            <!-- el end -->
            <!-- el start -->
            <div class="el five">
              <div class="el__overflow">
                <div class="el__inner">
                  <div class="el__bg"></div>
                  <div class="el__preview-cont">
                    <h2 class="el__heading"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">茄子</div></div></h2>
                  </div>
                  <div class="el__content">
                    <div class="el__text"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">随你</div></div></div>
                    <div class="el__close-btn"></div>
                  </div>
                </div>
              </div>
              <div class="el__index">
                <div class="el__index-back"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">5</div></div></div>
                <div class="el__index-front">
                  <div class="el__index-overlay" data-index="5"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">5</div></div></div>
                </div>
              </div>
            </div>
            <!-- el end -->
            <!-- el start -->
            <div class="el six">
              <div class="el__overflow">
                <div class="el__inner">
                  <div class="el__bg"></div>
                  <div class="el__preview-cont">
                    <h2 class="el__heading"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">甜瓜</div></div></h2>
                  </div>
                  <div class="el__content">
                    <div class="el__text"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">随你</div></div></div>
                    <div class="el__close-btn"></div>
                  </div>
                </div>
              </div>
              <div class="el__index">
                <div class="el__index-back"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">6</div></div></div>
                <div class="el__index-front">
                  <div class="el__index-overlay" data-index="6"><div style="vertical-align: inherit;"><div style="vertical-align: inherit;">6</div></div></div>
                </div>
              </div>
            </div>
            <!-- el end -->
          </div>
          <!-- cont inner end -->
        </div>
      </div>
<!--      实验台设备-->
<!--      <div class="square" v-for="number in numbers" :key="number.name">-->
<!--        <div style="font-size: 38px">-->
<!--          种类：{{number.name}}-->
<!--        </div>-->
<!--        <div>实验台ID：{{number.deviceid}}</div>-->
<!--        <div>培育天数：{{number.startday}}天</div>-->
<!--        <div>描述：<textarea v-model="number.remarks"></textarea></div>-->
<!--        <el-button type="success" @click="chooseDevice(number.deviceid)">进入实验室</el-button>-->
<!--      </div>-->
<!--      添加模块-->
<!--      <div class="el-icon-circle-plus-outline" style="font-size: 300px;color: #50d7ba;cursor: pointer" @click="showAddDev = 1"></div>-->
<!--      <div style="clear: both"></div>-->
<!--      &lt;!&ndash;添加设备模块&ndash;&gt;-->
<!--      <div v-if="showAddDev" class="showAddDev">-->
<!--        <div style="font-size: 30px;float:right;margin-right: 10px;cursor: pointer" @click="showAddDev = 0">×</div>-->
<!--        <div style="">-->
<!--          <p>设备名: <input type="text" v-model="addDev.deviceName"></p>-->
<!--          <p>设备id: <input type="text" v-model="addDev.deviceID"></p>-->
<!--          <p>设备备注: <input type="text" v-model="addDev.remarks"></p>-->
<!--          <el-button type="primary" @click="addDevice()">添加</el-button>-->
<!--        </div>-->
<!--      </div>-->
    </el-main>
  </el-container>
</template>

<script>
import data from '../cache'
export default {
  name: 'homepage',
  data () {
    return {
      username: null,
      numbers: [],
      showAddDev: 0,
      addDev: {
        deviceID: null,
        deviceName: null,
        remarks: null
      }
    }
  },
  mounted () {
    // 获取用户名
    this.username = sessionStorage.getItem('username')
    console.log(sessionStorage.getItem('username'))
    let showdev = new FormData()
    showdev.append('username', this.username)
    this.axios.post(data.serverSrc + '/userdev/showdev', showdev).then(body => {
      console.log(body)
      this.numbers = body.data
    })
    // 手风琴
    var $cont = document.querySelector('.cont')
    var $elsArr = [].slice.call(document.querySelectorAll('.el'))
    var $closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'))

    setTimeout(function () {
      $cont.classList.remove('s--inactive')
    }, 200)

    $elsArr.forEach(function ($el) {
      $el.addEventListener('click', function () {
        if (this.classList.contains('s--active')) return
        $cont.classList.add('s--el-active')
        this.classList.add('s--active')
      })
    })

    $closeBtnsArr.forEach(function ($btn) {
      $btn.addEventListener('click', function (e) {
        e.stopPropagation()
        $cont.classList.remove('s--el-active')
        document.querySelector('.el.s--active').classList.remove('s--active')
      })
    })
  },
  methods: {
    chooseDevice (deviceID) {
      // 存储选中的设备id
      sessionStorage.setItem('chooseDevice', deviceID)
      this.enterInterface()
    },
    enterInterface () {
      // 跳转单个实验台详细界面
      this.$router.push('/homepage')
    },
    addDevice () {
      if (this.addDev.deviceID && this.addDev.deviceName) {
        let addDevice = new FormData()
        addDevice.append('username', this.username)
        addDevice.append('deviceID', this.addDev.deviceID)
        addDevice.append('devicename', this.addDev.deviceName)
        addDevice.append('remarks', this.addDev.remarks)
        this.axios.post(data.serverSrc + '/userdev/adddev', addDevice).then(body => {
          if (body.data === 'success') {
            this.$message.success('上传成功')
          } else if (body.data === 'failed') {
            this.$message.error('添加失败')
          } else if (body.data === 'has') {
            this.$message.error('用户已拥有设备')
          } else if (body.data === 'device not exsit') {
            this.$message.error('设备不存在')
          } else {
            this.$message.error('上传失败')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  @import "../../style/style.css";
  @import "../../style/translateelement.css";
  .el-header {
    min-width: 625px;
    background-color: #B3C0D1;
    color: #333;
    padding: 0px;
    /*text-align: center;*/
    /*line-height: 60px;*/
  }
  .el-main {
    background-color: #E9EEF3;
    min-width: 625px;
    color: #333;
    padding: 0px;
    /*text-align: center;*/
    /*line-height: 160px;*/
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .square {
    float: left;
    margin: 10px 0px 10px 10px;
    height: 300px;
    width: 300px;
    border-radius: 20px;
    background-color: whitesmoke;
    box-shadow: 0 2px 4px rgba(0,0,0,12),0 0 6px rgba(0, 0, 0, .04);
  }
  .showAddDev {
    position: absolute;
    top: 61px;
    left: 50%;
    transform: translate(-50%, 0%);
    height: 500px;
    min-width: 500px;
    max-width: 800px;
    width: 80%;
    background-color: #898989;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    z-index: 99;
  }
</style>
