<template>
  <div id="container" class="box">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import token from '@/config/token.js'
import EventHandle from '@/plugin/eventHandle/index.js'
import ViewerCreate from '@/plugin/viewer/index.js'
import DrawPolygon from '@/plugin/entity/polygon.js'
import CesiumNavigation from 'cesium-navigation-es6'
export default {
  name: 'cesiumPage',
  data() {
    return {
      notifyObject: null,
      handleEvent: null,
    }
  },
  mounted() {
    let _this = this
    var TDU_Key = token
    var cesiumContainer = document.getElementById('cesiumContainer')
    var viewerCreate = new ViewerCreate({
      Cesium: _this.Cesium,
      cesiumContainer: cesiumContainer,
    })
    var viewer = viewerCreate.initViewer()
    this.$imageryLayersInit(viewer)
    this.$viewPosition({
      viewer: viewer,
      position: {
        lon: 103.84,
        lat: 31.15,
        height: 7000000.0,
      },
    })
    // this.initNavigation(viewer)
    this.$store.commit('SET_VIEWER', viewer)
    this.clickForPosition(viewer)
  },
  methods: {
    /**
     * 坐标获取及介绍获取
     */
    clickForPosition(viewer) {
      let _this = this
      this.handleEvent = new EventHandle({
        viewer: viewer,
        notification: _this.notifyObject,
        store: _this.$store,
        notify: _this.$notify,
      })
      this.handleEvent.setHandle()
      this.handleEvent.clickForPositionAndDescription()
      this.$store.commit('SET_VIEWER', viewer)
    },
    /**
     * 动态绘制
     */
    dynamicDrawGeometry() {
      this.handleEvent.destoryHandle()
      let type = this.$store.state.viewer.draw_type
      let style = this.$store.state.viewer.draw_style.data
      let viewer = this.$store.state.viewer.viewer
      let _this = this
      switch (type) {
        case 'polygon':
          let draw = new DrawPolygon({
            viewer: viewer,
            data: style,
            callback: function(evt) {
              let entity = evt
              draw.destroy()
              _this.clickForPosition(viewer)
              draw.reset()
              viewer.entities.add(entity)
              _this.$store.commit('SET_VIEWER', viewer)
            },
          })
          draw.dynamicDraw()
          break
        case 'polyline':
          break
        case 'point':
          break
        default:
          break
      }
    },
    /**
     * 初始化右上角罗盘
     */
    initNavigation(viewer) {
      var options = {}
      // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
      options.defaultResetView = Rectangle.fromDegrees(80, 22, 130, 50)
      // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
      options.enableCompass = true
      // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
      options.enableZoomControls = true
      // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
      options.enableDistanceLegend = true
      // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
      options.enableCompassOuterRing = true
      CesiumNavigation(viewer, options)
    },
  },
  computed: {
    dynamicDraw() {
      return this.$store.state.viewer.dynamic
    },
  },
  watch: {
    dynamicDraw(newV, oldV) {
      if (newV) {
        this.dynamicDrawGeometry()
      }
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
.el-notification {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
