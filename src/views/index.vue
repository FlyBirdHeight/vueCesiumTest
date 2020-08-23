
<template>
  <div id="container" class="box">
    <div id="cesiumContainer"></div>
  </div>
</template>
<script>

export default {
  name: 'cesiumPage',
  data () {
    return {
    }
  },
  mounted(){
    var Cesium = this.Cesium;
    var cesiumContainer = document.getElementById("cesiumContainer");
    var viewer = new Cesium.Viewer("cesiumContainer",{
      //加载在线谷歌地图
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
         url:"http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}"
      })
    })
      //去除 版权图标
      viewer._cesiumWidget._creditContainer.style.display="none";
  }
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

