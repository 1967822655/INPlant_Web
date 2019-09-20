<template>
    <div>
      <p>实验室</p>
      <el-row>
        <el-button type="success" @click="enterInterface">进入主页</el-button>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'homepage',
  // data () {},
  mounted () {
  },
  methods: {
    enterInterface () {
      this.$router.push('/homepage')
    }
  }
}
</script>

<style scoped>

</style>
