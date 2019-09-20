<template>
    <div>
      <div>登录界面</div>
      <el-button type="primary" @click="login">进入主界面</el-button>
    </div>
</template>

<script>
export default {
  name: 'login',
  // data () {},
  mounted () {
  },
  methods: {
    login () {
      this.$router.push('/index')
    }
  }
}
</script>

<style scoped>

</style>
