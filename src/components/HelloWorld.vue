<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>
<script>
import mqtt from 'mqtt'
export default {
  data () {
    return {
      reconnectTimeout: 2000,
      mqttClient: undefined,
      msg: '',
      url: 'ws://192.168.100.219:8085/mqtt',
      topic: '6af6188e14aa',
      userInfo: {
        username: 'supername',
        password: '123'
      }
    }
  },
  mounted () {
    this.connectToMqtt()
  },
  methods: {
    connectToMqtt () {
      console.log(this.url)
      console.log(this.userInfo)
      const client = mqtt.connect(this.url, this.userInfo)
      this.mqttClient = client
      client.on('connect', () => {
        console.log('connected...')
        console.log('成功连接服务器')
        // 订阅一个主题
        client.subscribe(this.topic, (error) => {
          if (!error) {
            console.log('订阅成功')
          }
        })
      })
      //  收到消息后执行回调，message是redis发布的消息
      client.on('message', function (channel, message) {
        console.log('我接收到' + channel + '的信息了' + message)
        this.msg.push(message)
        // dealWithMsg(message);
      })
      client.on('error', (error) => {
        console.log('连接失败:', error)
      })
    }
  }
}
</script>
<style>
  .apps {
    width: 100%;
    overflow: hidden;
  }
</style>
