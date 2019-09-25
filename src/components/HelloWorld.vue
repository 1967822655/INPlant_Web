<!--<template>-->
<!--  <div class="hello">-->
<!--    <h1>{{ msg }}</h1>-->
<!--    <el-button type="primary">success</el-button>-->
<!--    <h2>Essential Links</h2>-->
<!--    <ul>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://vuejs.org"-->
<!--          target="_blank"-->
<!--        >-->
<!--          Core Docs-->
<!--        </a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://forum.vuejs.org"-->
<!--          target="_blank"-->
<!--        >-->
<!--          Forum-->
<!--        </a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://chat.vuejs.org"-->
<!--          target="_blank"-->
<!--        >-->
<!--          Community Chat-->
<!--        </a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://twitter.com/vuejs"-->
<!--          target="_blank"-->
<!--        >-->
<!--          Twitter-->
<!--        </a>-->
<!--      </li>-->
<!--      <br>-->
<!--      <li>-->
<!--        <a-->
<!--          href="http://vuejs-templates.github.io/webpack/"-->
<!--          target="_blank"-->
<!--        >-->
<!--          Docs for This Template-->
<!--        </a>-->
<!--      </li>-->
<!--    </ul>-->
<!--    <h2>Ecosystem</h2>-->
<!--    <ul>-->
<!--      <li>-->
<!--        <a-->
<!--          href="http://router.vuejs.org/"-->
<!--          target="_blank"-->
<!--        >-->
<!--          vue-router-->
<!--        </a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="http://vuex.vuejs.org/"-->
<!--          target="_blank"-->
<!--        >-->
<!--          vuex-->
<!--        </a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="http://vue-loader.vuejs.org/"-->
<!--          target="_blank"-->
<!--        >-->
<!--          vue-loader-->
<!--        </a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://github.com/vuejs/awesome-vue"-->
<!--          target="_blank"-->
<!--        >-->
<!--          awesome-vue-->
<!--        </a>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'HelloWorld',-->
<!--  data () {-->
<!--    return {-->
<!--      msg: 'Welcome to Your Vue.js App'-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;-->
<!--<style scoped>-->
<!--h1, h2 {-->
<!--  font-weight: normal;-->
<!--}-->
<!--ul {-->
<!--  list-style-type: none;-->
<!--  padding: 0;-->
<!--}-->
<!--li {-->
<!--  display: inline-block;-->
<!--  margin: 0 10px;-->
<!--}-->
<!--a {-->
<!--  color: #42b983;-->
<!--}-->
<!--</style>-->
<template>
  <div class="div_main">
    <div class="classify">
      <span>方向:</span>
<!--      <RadioGroup type="button">-->
<!--        <Radio label="全部"></Radio>-->
<!--        <Radio label="后端开发"></Radio>-->
<!--        <Radio label="Linux运维"></Radio>-->
<!--        <Radio label="云计算大数据"></Radio>-->
<!--      </RadioGroup>-->
      <br>
      <br>
      <span>标签:</span>
<!--      <RadioGroup type="button" size="small" >-->
<!--        <Radio v-for="(tag, index0) in tags" :key="index0" :label="tag.content"></Radio>-->
<!--      </RadioGroup>-->
    </div>

    <div class="courseList">
      <table>
        <tr v-for="(course) in courses" :key="course">
          <a href="#" id="a">
            <!--<div @mouseover="onMouseOver(index)" @mouseleave="onMouseOut(index)">-->
            <div style="height: 300px;width: 200px;background-color: blue;position: relative">
              <div>
                <img src="../assets/logo.png">
              </div>
              <div class="demo" >
                {{course.info}}
                <div>
                  <span>{{course.content}}</span>
                </div>
              </div>
            </div>
          </a>
        </tr>
      </table>
    </div>

    <div class="page">
<!--      <Page :total="1000" prev-text="上一页" next-text="下一页" />-->
      <!--on-change 页码改变的回调，返回改变后的页码 页码-->
      <!--on-page-size-change 切换每页条数时的回调，返回切换后的每页条数 page-size-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      course: '',
      courses: [
        {img: '', info: '简介1', content: '要在实验楼愉快地学习，先要熟练地使用 Linux，本实验中通过在线动手实验的方式学习 Linux 常用命令，用户与权限管理，目录结构与文件操作，环境变量，计划任务，管道与数据流重定向等基本知识点。\n'},
        {img: '', info: '简介2', content: '要在实验楼愉快地学习，先要熟练地使用 Linux，本实验中通过在线动手实验的方式学习 Linux 常用命令，用户与权限管理，目录结构与文件操作，环境变量，计划任务，管道与数据流重定向等基本知识点。\n'},
        {img: '', info: '简介3', content: '要在实验楼愉快地学习，先要熟练地使用 Linux，本实验中通过在线动手实验的方式学习 Linux 常用命令，用户与权限管理，目录结构与文件操作，环境变量，计划任务，管道与数据流重定向等基本知识点。\n'}
      ],
      tags: [
        {content: '全部'},
        {content: 'Python'},
        {content: 'Java'},
        {content: 'C'}
      ],
      seen: false
    }
  },

  methods: {
    // onMouseOver (i) {
    //   console.log(i)
    //   this.seen = true
    // },
    // onMouseOut (i) {
    //   this.seen = false
    // }
  }
}
</script>

<style>
  #div_main{
    text-align: center;
  }
  .classify{
    /*position: absolute;*/
    /*top: 150px;*/
    /*left: 400px;*/
    /*float: left;*/
    margin: 0px auto;
  }
  .classify *{
    left: 0;
  }
  .courseList{
    /*position: absolute;*/
    top: 300px;
    left: 500px;
    float: left;
  }
  /*.demo{*/
  /*position: absolute;*/
  /*width: 200px;*/
  /*height: 20px;*/
  /*bottom: 420px;*/
  /*background: white;*/
  /*}*/
  .demo{
    position: absolute;
    /*margin-top: 100px;*/
    /*margin-left: 50px;*/
    width: 200px;
    height: 100px;
    bottom: 0px;
    background: black;
    -webkit-transition: height 2s;
    transition: height 2s;
  }
  #a:hover .demo{
    height: 200px;
  }
  .page{
    position: absolute;
    bottom: 30px;
    left: 40%;
  }
</style>
