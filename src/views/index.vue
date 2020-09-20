<template>
  <div id="container" class="box">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import token from '@/config/token.js'
import EventHandle from '@/plugin/eventHandle/index.js'
export default {
  name: 'cesiumPage',
  data() {
    return {
      notifyObject: null,
    }
  },
  mounted() {
    var TDU_Key = token
    var Cesium = this.Cesium
    var cesiumContainer = document.getElementById('cesiumContainer')
    var viewer = new Cesium.Viewer('cesiumContainer', {
      infoBox: false,
      geocoder: false, //控制右上角第一个位置的查找工具
      homeButton: false, //控制右上角第二个位置的home图标
      sceneModePicker: false, //控制右上角第三个位置的选择视角模式，2d，3d
      baseLayerPicker: false, //控制右上角第四个位置的图层选择器
      navigationHelpButton: false, //控制右上角第五个位置的导航帮助按钮
      animation: true, //控制左下角的动画器件
      timeline: true, //控制下方时间线
      fullscreenButton: false, //右下角全屏按钮
      shouldAnimate: true,
      selectionIndicator: false,
      terrainProvider: Cesium.createWorldTerrain(),
    })
    viewer.timeline.container.style.display = 'none'
    viewer.animation.container.style.display = 'none'
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    this.$imageryLayersInit(viewer)
    this.seeChina(viewer)
    this.clickForPosition(viewer)
    viewer.scene.debugShowFramesPerSecond = true
    this.$store.commit('SET_VIEWER', viewer)
  },
  methods: {
    clickForPosition(viewer) {
      let _this = this;
      var handleEvent = new EventHandle({
        viewer: viewer,
        notification: _this.notifyObject,
        store: _this.$store,
        notify: _this.$notify
      });
      handleEvent.clickForPositionAndDescription()
    },
    seeChina(viewer) {
      viewer.camera.setView({
        destination: this.Cesium.Cartesian3.fromDegrees(103.84, 31.15, 7000000),
      })
      this.$store.commit('SET_VIEWER', viewer)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.box {
  height: calc(100% - 60px);
}
</style>
<style>
.el-notification{
    background-color: rgba(255,255,255,0.8)
}
</style>
