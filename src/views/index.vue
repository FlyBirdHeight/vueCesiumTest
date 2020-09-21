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
    this.seeChina(viewer)
    this.clickForPosition(viewer)
    this.$store.commit('SET_VIEWER', viewer)
  },
  methods: {
    clickForPosition(viewer) {
      let _this = this
      this.handleEvent = new EventHandle({
        viewer: viewer,
        notification: _this.notifyObject,
        store: _this.$store,
        notify: _this.$notify,
      })
      this.handleEvent.setHandle();
      this.handleEvent.clickForPositionAndDescription()
      this.$store.commit("SET_VIEWER",viewer);
    },
    seeChina(viewer) {
      viewer.camera.setView({
        destination: this.Cesium.Cartesian3.fromDegrees(103.84, 31.15, 7000000),
      })
      this.$store.commit('SET_VIEWER', viewer)
    },
    dynamicDrawGeometry() {
      this.handleEvent.destoryHandle()
      let type = this.$store.state.viewer.draw_type
      let style = this.$store.state.viewer.draw_style.data
      let viewer = this.$store.state.viewer.viewer
      let _this = this;
      switch (type) {
        case 'polygon':
          let draw = new DrawPolygon({
            viewer: viewer,
            data: style,
            callback: function(evt){
              let entity = evt;
              draw.destroy();
              _this.clickForPosition(viewer);
              draw.reset();
              viewer.entities.add(entity);
            }
          })
          draw.dynamicDraw();
          break
        case 'polyline':
          break
        case 'point':
          break
        default:
          break
      }
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
