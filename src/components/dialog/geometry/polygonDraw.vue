<template>
  <el-dialog
    title="动态绘制多边形规则"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    :modal="false"
    :show="show"
    width="35%"
  >
  <div>
      <span>1. 点击绘制按钮后，来到主页面，可以使用左上角搜索框，搜索需要绘图的地址并进行跳转。</span>
      <el-divider></el-divider>
      <span>2. 开始绘制：首先按下鼠标的左键，选择需要绘制的顶点</span>
      <el-divider></el-divider>
      <span>3. 松开右键，移动鼠标，再次选择需要绘制的顶点</span>
      <el-divider></el-divider>
      <span>4. 重复2，3步骤，直到绘制出所需图形后，按下鼠标右键结束绘制</span>
  </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      this.visible = this.show
    },
  },
}
</script>

<style>
.el-dialog,
.el-pager li {
  background: rgba(255, 255, 255, 0.9);
}
</style>
