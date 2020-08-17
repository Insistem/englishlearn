<template>
  <div>
    <div class="title">
      <audio ref="audio"
             controls
             :src="require(`@/assets/${this.curProblem.word}/${this.curProblem.word}.mp3`)"
             autoplay
             @canplay="getDuration"
             @timeupdate="updateTime"></audio>
    </div>
    <div class="problem">
      <!-- 这样写是不对的 -->
      <img :src="require(`@/assets/${this.curProblem.word}/problem.png`)"
           alt="">
    </div>
    <div class="selection">
      <el-radio-group v-model="checkedProblem"
                      @change="checkChange">
        <div class="A">
          <el-radio label="A"
                    border></el-radio>
          <img :src="require(`@/assets/${this.curProblem.word}/A.png`)"
               alt="">
        </div>
        <div class="B">
          <el-radio label="B"
                    border></el-radio>
          <img :src="require(`@/assets/${this.curProblem.word}/B.png`)"
               alt="">
        </div>
        <div class="C">
          <el-radio label="C"
                    border></el-radio>
          <img :src="require(`@/assets/${this.curProblem.word}/C.png`)"
               alt="">
        </div>
        <div class="D">
          <el-radio label="D"
                    border></el-radio>
          <img :src="require(`@/assets/${this.curProblem.word}/D.png`)"
               alt="">
        </div>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['curProblem', 'shutDown'],
    data () {
      return {
        checkedProblem: '',
        duration: 0,
        timer: '',
        optionsList: ['A', 'B', 'C', 'D']
      }
    },
    watch: {
      curProblem (val) {
        // 切换为下一题时，触发此事件
        this.countDown = val.countDown
        // 清空上次的选项
        this.checkedProblem = ''
      }
    },
    mounted () {
      this.countDown = this.curProblem.countDown
    },
    methods: {
      /** 用户点击选项后，传给父组件
       * @params {String} selection 用户的选项
       */
      checkChange (selection) {
        this.$emit('selected', selection)
      },
      // 获取audio的播放时长
      getDuration () {
        // console.log('duration', this.$refs.audio.duration)
        this.duration = this.$refs.audio.duration
      },
      // 播放音频过程中实时触发的函数
      updateTime (e) {
        this.currentTime = e.target.currentTime // 获取audio当前播放时间
        // console.log('this.currentTime', this.currentTime)
        // 说明播放结束，开始答题倒计时
        if (this.duration === this.currentTime) {
          // 切换到下一题，先把上一道题的倒计时器清除
          if (this.timer) {
            clearInterval(this.timer)
          }
          // 开启一个倒计时
          this.timer = setInterval(() => {
            this.$emit('countDown', this.countDown)
            if (this.countDown === 0 || this.shutDown) {
              clearInterval(this.timer)
              // 倒计时结束，如果用户没有自己点击下一题，自动跳转到下一题
              // 如果此时为最后一题,那么不用再触发下一题
              if (!this.shutDown) {
                this.$emit('autoNextOne')
              }
            }
            this.countDown--
          }, 1000)

        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .problem {
    img {
      width: 200px;
      height: 200px;
    }
  }
  .selection {
    font-size: 50px;
    .el-radio-group {
      display: flex;
    }
    & > div {
      width: 25%;
      height: 50;
    }
    img {
      width: 200px;
      height: 200px;
    }
  }
</style>