<template>
  <div id="container" class="box">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import token from '@/config/token.js'
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
      var Cesium = this.Cesium
      var handle = new Cesium.ScreenSpaceEventHandler(this.$store.state.viewer.viewer.scene.canvas)
      var store = this.$store
      let _this = this
      handle.setInputAction(function(mouse) {
        var picker = viewer.scene.pick(mouse.position)
        if (Cesium.defined(picker)) {
          if (_this.notifyObject != null) {
            _this.notifyObject.close()
          }
          _this.notifyObject = _this.$notify({
            title: '拾取对象信息',
            dangerouslyUseHTMLString: true,
            offset: 100,
            duration: 3500,
            message:
              '<table class="cesium-infoBox-defaultTable"><tbody>' +
              '<tr><th>类型</th><td>' +
              picker.primitive.constructor.name +
              '</td></tr>' +
              '<tr><th>id</th><td>' +
              picker.id.id +
              '</td></tr>' +
              '<tr><th>名称</th><td>' +
              picker.id.name +
              '</td></tr>' +
              '<tr><th>介绍</th><td>' +
              picker.id.description._value +
              '</td></tr>' +
              '</tbody></table>',
          })
        } else {
          //地标坐标：获取点击处地球表面的世界坐标，不包括模型、倾斜摄影表面
          var ray = viewer.camera.getPickRay(mouse.position)
          var globe = viewer.scene.globe
          var cartesian = globe.pick(ray, viewer.scene)
          if (!Cesium.defined(cartesian)) {
            return
          }
          //维度
          var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
          var latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)
          //经度
          var longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)
          if (store.state.geometryForm.selectPostion) {
            store.commit('SET_LAT', latitude)
            store.commit('SET_LON', longitude)
            store.commit('SET_LEFT_DRAWER', true)
            store.commit('SET_LEFT_INNERDRAWER', true)
            store.commit('SET_SELECT_POSITION', false)
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
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
