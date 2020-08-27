<!--- 右侧边展开栏 --->
<template>
  <el-drawer :title="title" :visible.sync="drawer" direction="ltr" size="45%">
    <div>
      <el-button @click="innerDrawer = true">{{ subTitle }}</el-button>
      <el-drawer :title="subTitle" :append-to-body="true" :before-close="handleClose" :visible.sync="innerDrawer">
        <p>_(:зゝ∠)_</p>
      </el-drawer>
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '默认',
    },
    subTitle: {
      type: String,
      default: '默认',
    },
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerDrawer: false,
    }
  },
  methods: {
    handleClose() {
        console.log(123);
    },
  },
  components: {},
}
</script>

<style></style>
