<template>
  <div class="container">
    <div class="main">
      <div class="top-bar">
        <div class="indicator">第{{curPointer}}题/共{{problemsList.length}}题</div>
        <div class="clock">剩余时间：{{countDown}}秒</div>
      </div>
      <div class="content">
        <div class="problemDetail">

          <problem-content :curProblem="curProblem"
                           @countDown="countDownFunc"
                           @autoNextOne="autoNextOne"
                           @selected="selected"
                           :shutDown="shutDown"
                           v-if="!shutDown"></problem-content>
          <!-- 页面中展示JSON数据 -->
          <!-- <pre><code ref="json" v-if="shutDown"></code></pre> -->
          <vue-json-pretty v-if="shutDown"
                           :path="'res'"
                           :data="problemsList"
                           :deep="3"
                           :highlight-mouseover-node="true"
                           :show-select-controller="true"
                           :show-length="true" />
        </div>
        <el-button @click="nextClick(false)"
                   v-show="!shutDown">下一题</el-button>
        <el-button @click="restart"
                   v-show="shutDown">重新开始</el-button>
        <!-- v-clipboard:copy="JSON.stringify(problemsList)"
                   v-clipboard:success="onCopy" -->
        <el-button v-show="shutDown"
                   type="success"
                   @click="copyFunc(JSON.stringify(problemsList))">复制数据</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import ProblemContent from './content'
  import VueJsonPretty from 'vue-json-pretty'
  export default {
    components: { ProblemContent, VueJsonPretty },
    data () {
      return {
        curPointer: 1,
        leaveTime: 5,
        problemsList: [
          { word: 'example', countDown: 5, correctAnswer: 'A', userSelect: '', },
          { word: 'communication', countDown: 6, correctAnswer: 'A', userSelect: '' },
          { word: 'application', countDown: 7, correctAnswer: 'A', userSelect: '' },
        ],
        countDown: 0,
        selectedOption: '',
        shutDown: false
      }
    },
    computed: {
      curProblem () {
        return this.problemsList[this.curPointer - 1]
      }
    },
    created () {
      this.countDown = this.curProblem.countDown
    },
    methods: {
      copyFunc (content) {
        // 创建元素用于复制
        var aux = document.createElement("input")
        // 设置元素内容
        aux.setAttribute("value", content)
        // 将元素插入页面进行调用
        document.body.appendChild(aux)
        // 复制内容
        aux.select()
        // 将内容复制到剪贴板
        document.execCommand("copy")
        // 删除创建元素
        document.body.removeChild(aux)
        //提示
        // alert("复制内容成功：" + aux.value)
        this.$message('复制成功！')
      },
      // 重新开始
      restart () {
        this.$router.push('/')
      },
      /** 跳转到下一题的事件
       * @params {Boolean} auto 是否自动跳转到下一题，默认为false
       */
      nextClick (auto = false) {
        const list = this.problemsList
        // 清算当前页面的用户数据，答题时长+选择的答案
        const curProblemItem = this.problemsList[this.curPointer - 1]
        if (auto) {
          // 如果是自动跳转，那么用户没选
          this.problemsList[this.curPointer - 1].userSelect = '1' // 用户选择为空
          this.problemsList[this.curPointer - 1].timeConsuming = curProblemItem.countDown // 用户耗时就是题目设置的答题时长
        } else {
          // 如果是用户自己选择的
          this.problemsList[this.curPointer - 1].userSelect = this.selectedOption // 用户选择
          this.problemsList[this.curPointer - 1].timeConsuming = curProblemItem.countDown - this.countDown // 用户耗时 = 该题设置的答题时长 - 剩余倒计时
          console.log('this.selectedOption', this.selectedOption, curProblemItem.countDown - this.countDown)
        }
        // 答题结束
        if (list.length === this.curPointer) {
          // console.log('this.problemsList', this.problemsList)
          // 是否答题完成的标志
          this.shutDown = true
          const resJSON = JSON.stringify(this.problemsList)
          // 将最终的数据转为JSON格式，并且下载到本地
          console.save(resJSON, 'button.json')
          this.$message.warning('答题结束！')
        } else {
          // 将页面内容调整为下一题
          this.curPointer++
          // 清空选项
          this.selectedOption = ''
          // 将当前页面的倒计时更改为下一题的时长
          this.countDown = this.curProblem.countDown
        }
      },
      // 刷新倒计时
      countDownFunc (remainTime) {
        this.countDown = remainTime
      },
      // 自动跳转下一题
      autoNextOne (selected) {
        this.nextClick(true, selected)
      },
      // 用户的选项
      selected (option) {
        this.selectedOption = option
      },
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    background-color: #ebeaea;
    display: flex;
    justify-content: center;
    .main {
      width: 50%;
      background-color: #fff;
      .top-bar {
        height: 50px;
        background-color: #66b1ff;
        border: 1px solid #66b1ff;
        margin-bottom: 4px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        font-size: 20px;
        padding: 0 10px;
      }
      .content {
        .problemDetail {
          text-align: left;
        }
      }
    }
  }
</style>