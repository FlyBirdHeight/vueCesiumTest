<template>
  <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">
      添加几何体
    </el-menu-item>
    <el-menu-item index="3">
      添加czml文件
    </el-menu-item>
    <el-menu-item index="4">
      设置地形
    </el-menu-item>
    <el-menu-item index="5">
      设置运动轨迹
    </el-menu-item>
    <div class="select-input">
      <el-input v-model="position" placeholder="请输入想要跳转的地址" style="width:200px"> </el-input>
      <el-button size="mini" style="margin-left:10px">点击跳转</el-button>
    </div>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      position: '',
    }
  },
}
</script>

<style scoped>
.select-input {
  width: 300px;
  display: inline-block;
  float: right;
  margin-top: 10px;
}
</style>
