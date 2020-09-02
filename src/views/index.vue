<template>
<div id="container" class="box">
    <div id="cesiumContainer"></div>
</div>
</template>

<script>
import token from "@/config/token.js";
export default {
    name: "cesiumPage",
    data() {
        return {};
    },
    mounted() {
        var TDU_Key = token;
        var Cesium = this.Cesium;
        var cesiumContainer = document.getElementById("cesiumContainer");
        var viewer = new Cesium.Viewer("cesiumContainer", {
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
            selectionIndicator: true,
            terrainProvider: Cesium.createWorldTerrain()
        });
        viewer.timeline.container.style.display = 'none';
        viewer.animation.container.style.display = 'none'
        viewer._cesiumWidget._creditContainer.style.display = "none";
        //在线天地图影像服务地址(墨卡托投影)
        var TDT_IMG_W =
            "http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
            "&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
            "&style=default&format=tiles&tk=" +
            TDU_Key;
        //在线天地图影像中文标记服务(墨卡托投影)
        var TDT_CIA_W =
            "http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
            "&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
            "&style=default.jpg&tk=" +
            TDU_Key;
        //在线天地图影像国境线标记服务(墨卡托投影)
        var TDT_IBO_W =
            "http://{s}.tianditu.gov.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
            "&LAYER=ibo&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
            "&style=default.jpg&tk=" +
            TDU_Key;

        let Img = new Cesium.WebMapTileServiceImageryProvider({
            //调用影响中文服务
            url: TDT_IMG_W, //url地址
            layer: "img_w", //WMTS请求的层名称
            style: "default", //WMTS请求的样式名称
            format: "tiles", //MIME类型，用于从服务器检索图像
            tileMatrixSetID: "GoogleMapsCompatible", //	用于WMTS请求的TileMatrixSet的标识符
            subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], //天地图8个服务器
            minimumLevel: 0, //最小层级
            maximumLevel: 18 //最大层级
        });
        viewer.imageryLayers.addImageryProvider(Img); //添加到cesium图层上

        let cia = new Cesium.WebMapTileServiceImageryProvider({
            //调用影响中文注记服务
            url: TDT_CIA_W,
            layer: "cia_w",
            style: "default",
            format: "tiles",
            tileMatrixSetID: "GoogleMapsCompatible",
            subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], //天地图8个服务器
            minimumLevel: 0,
            maximumLevel: 18
        });
        viewer.imageryLayers.addImageryProvider(cia);

        let ibo = new Cesium.WebMapTileServiceImageryProvider({
            //调用影响中文注记服务
            url: TDT_IBO_W,
            layer: "ibo_w",
            style: "default",
            format: "tiles",
            tileMatrixSetID: "GoogleMapsCompatible",
            subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], //天地图8个服务器
            minimumLevel: 0,
            maximumLevel: 18
        });
        viewer.imageryLayers.addImageryProvider(ibo);
        this.seeChina(viewer);
        this.clickForPosition(viewer);
        viewer.scene.debugShowFramesPerSecond = true;
        this.$store.commit("SET_VIEWER", viewer);
    },
    methods: {
        clickForPosition(viewer) {
            var Cesium = this.Cesium;
            this.handler.setInputAction(function (mouse) {
                //地标坐标：获取点击处地球表面的世界坐标，不包括模型、倾斜摄影表面
                // var ray = viewer.camera.getPickRay(mouse.position)
                // var earthPosition = viewer.scene.globe.pick(ray, viewer.scene)

                viewer.scene.pick(mouse.position);
                var ray = viewer.camera.getPickRay(mouse.position);
                var globe = viewer.scene.globe;
                var cartesian = globe.pick(ray, viewer.scene);
                if (!Cesium.defined(cartesian)) {
                    return;
                }
                //维度
                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                var latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
                //经度
                var longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(
                    4
                );
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        },
        seeChina(viewer) {
            viewer.camera.flyTo({
                destination: this.Cesium.Cartesian3.fromDegrees(103.84, 31.15, 7000000),
                orientation: {
                    heading: this.Cesium.Math.toRadians(348.4202942851978),
                    pitch: this.Cesium.Math.toRadians(-89.74026687972041),
                    roll: this.Cesium.Math.toRadians(0)
                }
            });
            this.$store.commit("SET_VIEWER", viewer);
        },
        initViewer() {}
    },
    computed: {
        handler() {
            var Cesium = this.Cesium;
            return new Cesium.ScreenSpaceEventHandler(
                this.$store.state.viewer.viewer.scene.canvas
            );
        }
    }
};
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
