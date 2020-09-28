<template>
<div id="container" class="box">
    <div id="cesiumContainer">
        <div id="overview" class="leaflet-control-minimap"></div>
    </div>
</div>
</template>

<script>
import EventHandle from '@/plugin/eventHandle/index.js'
import ViewerCreate from '@/plugin/viewer/index.js'
import DrawPolygon from '@/plugin/entity/polygon.js'
import DrawPolyline from '@/plugin/entity/polyline.js'
import CesiumNavigation from 'adsionli-navigation'
import Handle from '@/plugin/handle/handle.js'
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
        this.initNavigation(viewer)
        this.$store.commit('SET_VIEWER', viewer)
        this.clickForPosition(viewer)
        let handle = new Handle();
        handle.initOverview({
            viewer: viewer,
            L: this.L
        })
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
        reset(viewer) {
            this.$store.commit('SET_VIEWER', viewer)
            this.$store.commit('SET_DYNAMIC', false)
            this.$store.commit('SET_DRAW_TYPE', '')
            this.$store.commit('SET_DRAW_STYLE', {
                data: {},
            })
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
                    let drawPolygon = new DrawPolygon({
                        viewer: viewer,
                        data: style,
                        callback: function (evt) {
                            drawPolygon.destroy()
                            _this.clickForPosition(viewer)
                            viewer = drawPolygon.reset()
                            viewer.entities.add(evt)
                            _this.reset(viewer);
                        },
                    })
                    drawPolygon.dynamicDraw()
                    break
                case 'polyline':
                    let drawPolyline = new DrawPolyline({
                        viewer: viewer,
                        data: style,
                        callback: function (evt) {
                            drawPolyline.destroy()
                            viewer = drawPolyline.reset()
                            _this.clickForPosition(viewer)
                            _this.reset(viewer);
                        },
                    })
                    drawPolyline.dynamicDraw()
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
            options.defaultResetView = this.Cesium.Cartographic.fromDegrees(103.84, 31.15, 7000000)
            options.enableCompass = true
            options.enableZoomControls = true
            options.enableDistanceLegend = true
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
    }
}
</script>

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
</style><style>
.el-notification {
    background-color: rgba(255, 255, 255, 0.8);
}
</style>
