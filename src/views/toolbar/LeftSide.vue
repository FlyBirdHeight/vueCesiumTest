<template>
  <el-drawer
    :title="$store.state.leftSide.title"
    :modal="false"
    :visible.sync="$store.state.leftSide.drawer"
    size="45%"
    style="outline:0"
  >
    <geometry></geometry>
    <el-drawer
      style="outline:0"
      :title="$store.state.leftSide.subTitle"
      :append-to-body="true"
      :before-close="handleClose"
      :visible.sync="$store.state.leftSide.innerDrawer"
      :modal="false"
    >
      <geometry-add v-if="$store.state.leftSide.type == 'geometry'"></geometry-add>
    </el-drawer>
  </el-drawer>
</template>

<script>
import geometry from '../geometry/index'
import geometryAdd from '../geometry/form'
export default {
  data() {
    return {
      innerDrawer: false,
    }
  },
  methods: {
    setInnerDrawer() {
      this.$store.commit('SET_LEFT_INNERDRAWER', true)
    },
    handleClose() {
      this.$store.commit('SET_LEFT_INNERDRAWER', false)
    },
  },
  components: {
    geometry,
    geometryAdd,
  },
}
</script>

<style scoped>
/deep/ :focus {
  outline: 0;
}</style
><style>
.el-drawer.rtl {
  background: rgba(255, 255, 255, 0.8);
}

.el-drawer__body {
  overflow-y: auto;
}

.el-drawer__body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.el-drawer__body::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

.el-drawer__body::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ffffff;
  border-radius: 10px;
}

.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 1px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 15px;
}

.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ffffff;
  border-radius: 10px;
}
</style>
