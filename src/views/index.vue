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
    return {}
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
      animation: false, //控制左下角的动画器件
      timeline: false, //控制下方时间线
      fullscreenButton: false, //右下角全屏按钮
      shouldAnimate: true,
      selectionIndicator: true,
    })
    //在线天地图影像服务地址(墨卡托投影)
    var TDT_IMG_W =
      'http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
      '&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
      '&style=default&format=tiles&tk=' +
      TDU_Key
    //在线天地图影像中文标记服务(墨卡托投影)
    var TDT_CIA_W =
      'http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
      '&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
      '&style=default.jpg&tk=' +
      TDU_Key
    //在线天地图影像国境线标记服务(墨卡托投影)
    var TDT_IBO_W =
      'http://{s}.tianditu.gov.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
      '&LAYER=ibo&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
      '&style=default.jpg&tk=' +
      TDU_Key

    let Img = new Cesium.WebMapTileServiceImageryProvider({
      //调用影响中文服务
      url: TDT_IMG_W, //url地址
      layer: 'img_w', //WMTS请求的层名称
      style: 'default', //WMTS请求的样式名称
      format: 'tiles', //MIME类型，用于从服务器检索图像
      tileMatrixSetID: 'GoogleMapsCompatible', //	用于WMTS请求的TileMatrixSet的标识符
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], //天地图8个服务器
      minimumLevel: 0, //最小层级
      maximumLevel: 18, //最大层级
    })
    viewer.imageryLayers.addImageryProvider(Img) //添加到cesium图层上

    let cia = new Cesium.WebMapTileServiceImageryProvider({
      //调用影响中文注记服务
      url: TDT_CIA_W,
      layer: 'cia_w',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'GoogleMapsCompatible',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], //天地图8个服务器
      minimumLevel: 0,
      maximumLevel: 18,
    })
    viewer.imageryLayers.addImageryProvider(cia)

    let ibo = new Cesium.WebMapTileServiceImageryProvider({
      //调用影响中文注记服务
      url: TDT_IBO_W,
      layer: 'ibo_w',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'GoogleMapsCompatible',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], //天地图8个服务器
      minimumLevel: 0,
      maximumLevel: 18,
    })
    viewer.imageryLayers.addImageryProvider(ibo)

    viewer._cesiumWidget._creditContainer.style.display = 'none'
    viewer.scene.debugShowFramesPerSecond = true
    viewer.camera.flyTo({
      destination: this.Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
      orientation: {
        heading: this.Cesium.Math.toRadians(348.4202942851978),
        pitch: this.Cesium.Math.toRadians(-89.74026687972041),
        roll: this.Cesium.Math.toRadians(0),
      },
    })
    this.$store.commit('SET_VIEWER', viewer)
  },
  methods: {},
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
