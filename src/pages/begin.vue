<template>
  <div>
    
    <el-button @click="startBtn">开始按钮</el-button>
    <!-- 弹框 -->
    <el-dialog title="提示"
               :visible.sync="centerDialogVisible"
               width="30%"
               center>
      <span>请选择开始的模式</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">极速模式</el-button>
        <el-button type="primary"
                   @click="commonConfirm">普通模式</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
          centerDialogVisible: false
      }
    },
    methods: {
        // 游戏开始
        startBtn () {
          this.centerDialogVisible = true
        },
        commonConfirm () {
          this.centerDialogVisible = false
          this.$router.push('/detail')
        },
    }
  }
</script>
<style lang="scss" scoped>
</style>