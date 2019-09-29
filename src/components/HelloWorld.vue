<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reconnectTimeout: 2000,
      mqtt: {},
      msg: '',
      host: '',
      port: '',
      addtopic: '',
      useTLS: false,
      username: '',
      password: '',
      cleansession: false
    }
  },
  mounted () {
    this.MQTTconnect()
  },
  methods: {
    addtopic (msg) {
      this.msg = msg
    },

    // 实时通信
    MQTTconnect () {
      this.mqtt = new Paho.MQTT.Client( // 实例化一个对象
        host,
        port,
        'client' + this.getuuid() // 防止多个浏览器打开，导致的问题，保证唯一性
      )
      var options = {
        timeout: 10,
        useSSL: useTLS,
        cleanSession: cleansession,
        // 如果为false(flag=0)，Client断开连接后，Server应该保存Client的订阅信息。如果为true(flag=1)，表示Server应该立刻丢弃任何会话状态信息。
        onSuccess: this.onConnect,
        onFailure: function (message) {
          // 连接失败定时重连
          setTimeout(this.MQTTconnect, this.reconnectTimeout)
        }
      }
      this.mqtt.onConnectionLost = this.onConnectionLost
      this.mqtt.onMessageArrived = this.onMessageArrived
      // 用户名和密码的验证，我这里都为空；不加验证
      if (username != null) {
        options.userName = username
        options.password = password
      }
      this.mqtt.connect(options)
    },
    // uuid随机生成
    getuuid () {
      var uid = []
      var hexDigits = '0123456789abcdefghijklmnopqrst'
      for (var i = 0; i < 32; i++) {
        uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      uid[6] = '4'
      uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1)
      var uuid = uid.join('')
      return uuid
    },
    // 连接
    onConnect () {
      // 连接成功，订阅主题
      this.mqtt.subscribe(addtopic, {
        qos: 2
        // QoS0，最多一次送达。也就是发出去就fire掉，没有后面的事情了。
        // QoS1，至少一次送达。发出去之后必须等待ack，没有ack，就要找时机重发
        // QoS2，准确一次送达。消息id将拥有一个简单的生命周期。
      })

      // 发布一个消息，再连接成功后，发送一个响应，确保连接没有问题；
      this.mqtt.send('login', '{"command":"login","clientId":"' + this.mqtt.clientId + '"}', 0)
    },
    // 连接丢失
    onConnectionLost (response) {
      // console.log("异常掉线，掉线信息为:" + response.errorMessage);
    },

    // 接收到消息，处理
    onMessageArrived (message) {
      var topics = message.destinationName
      var msg = $.parseJSON(message.payloadString)
      // 判断主题，调用方法，这里可以订阅多个主题，在此处判断，接受不同的主题，调用不同的方法！
      if (topics == 'add') {
        // 添加
        this.addtopic(msg)
      } else {

      }
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
