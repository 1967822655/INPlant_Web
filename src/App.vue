<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    var view = this.getViewportOffset()
    console.log(view)
    if (view.w < 768) {
      var app = document.getElementById('app')
      app.style.width = '1200px'
    }
  },
  methods: {
    getViewportOffset () {
      if (window.innerWidth) {
        return {
          w: window.innerWidth,
          h: window.innerHeight
        }
      } else {
        if (document.compatMode === 'BackCompat') {
          return {
            w: document.body.clientWidth,
            h: document.body.clientHeight
          }
        } else {
          return {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
          }
        }
      }
    }
  }
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
html,body,#app {
  /*width: 1200px;*/
  height: 100%;
  margin: 0 auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  height: 100%;
  /*margin-top: 60px;*/
}
</style>
