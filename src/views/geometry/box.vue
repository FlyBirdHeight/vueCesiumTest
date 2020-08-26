<template> </template>

<script>
export default {
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
          alpha: 0.4,
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
  methods: {
    createBox() {
      var viewer = this.$store.state.viewer.viewer
      var box = viewer.entities.add({
        name: this.type.name,
        position: new Cesium.Cartesian3.fromDegrees(
          this.type.position.east,
          this.type.position.north,
          this.type.position.height
        ),
        box: {
          dimensions: new Cesium.Cartesian3(
            this.type.dimensions.length,
            this.type.dimensions.width,
            this.type.dimensions.height
          ),
          fill: this.type.fillShow,
          material: new Cesium.Color(
            this.type.material.red,
            this.type.material.green,
            this.type.material.blue,
            this.type.material.alpha
          ),
          outline: this.type.outlineShow,
          outlineColor: new Cesium.Color(this.type.outline.red, this.type.outline.green, this.type.outline.blue),
          show: this.type.show,
        },
      })
      viewer.zoomTo(viewer.entities)
      this.$store.commit('SET_VIEWER', viewer)
    },
  },
  watch: {},
}
</script>

<style></style>
