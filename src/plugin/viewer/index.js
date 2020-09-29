class ViewerCreate {
    constructor(arg) {
        this.Cesium = arg.Cesium;
        this.cesiumContainer = arg.cesiumContainer;
    }

    /**
     * 初始化viewer对象
     * return {Object} viewer
     */
    initViewer() {
        var Cesium = this.Cesium;
        var cesiumContainer = this.cesiumContainer;
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
        viewer.scene.debugShowFramesPerSecond = true
        viewer.scene.globe.depthTestAgainstTerrain = true;

        return viewer;
    }
}

export default ViewerCreate;