<template>
  <div id="container" class="box">
    <div id="cesiumContainer"></div>
  </div>
</template>
<script>
export default {
  name: 'cesiumPage',
  data() {
    return {
      type: {
        type: 'box',
        name: 'first box',
        position: {
          east: 120.52,
          north: 31.1,
          height: 100.0,
        },
        dimensions: {
          length: 50000.0,
          width: 30000.0,
          height: 10000.0,
        },
        fillShow: true,
        material: {
          red: 0.45,
          green: 0.18,
          blue: 0.76,
          alpha: 0.4
        },
        outlineShow: true,
        outline: {
          red: 1,
          green: 1,
          blue: 1,
        },
        show: true,
      },
    }
  },
  mounted() {
    var Cesium = this.Cesium
    var cesiumContainer = document.getElementById('cesiumContainer')
    var viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
      }),
    })
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    var box = viewer.entities.add({
      name: this.type.name,
      position: new Cesium.Cartesian3.fromDegrees(this.type.position.east, this.type.position.north, this.type.position.height),
      box: {
        dimensions: new Cesium.Cartesian3(this.type.dimensions.length, this.type.dimensions.width, this.type.dimensions.height),
        fill: this.type.fillShow,
        material: new Cesium.Color(this.type.material.red, this.type.material.green, this.type.material.blue, this.type.material.alpha),
        outline: this.type.outlineShow,
        outlineColor: new Cesium.Color(this.type.outline.red, this.type.outline.green, this.type.outline.blue),
        show: this.type.show,
      },
    })
    viewer.zoomTo(viewer.entities)
  },
  methods: {
    createEntities(viewer, type) {
      switch (type.type) {
        case 'polyline':
          viewer.entities.add({})
          break
        case 'polyson':
          break
        case 'box':
          var box = viewer.entities.add({
            name: type.name,
            position: new Cesium.Cartesian3.fromDegrees(type.position.east, type.position.north, type.position.height),
            box: {
              dimensions: new Cesium.Cartesian3(type.dimensions.length, type.dimensions.width, type.dimensions.height),
              fill: type.fillShow,
              material: new Cesium.Color(
                type.material.red,
                type.material.green,
                type.material.blue,
                type.material.alpha
              ),
              outline: type.outlineShow,
              outlineColor: new Cesium.Color(type.outline.red, type.outline.green, type.outline.blue),
              show: type.show,
            },
          })
          break
        case 'cylinder':
          break
        case 'billboard':
          break
        case 'ellipse':
          break
        default:
          break
          viewer.zoomTo(viewer.entities)
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
  height: 100%;
}
</style>
