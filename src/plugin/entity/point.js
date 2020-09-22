/**
 * 绘制点类
 */
class DrawPoint {
    /**
     * 初始化
     * @param {Object} arg 
     */
    constructor(arg) {
        this.viewer = arg.viewer;
        this.Cesium = require('cesium/Cesium');
        this.callback = arg.callback;
        this.data = arg.data;
        this._point = null;  //最后一个点
        this._pointData = null;//点数据用于构造点
        this._entities = []; //脏数据
    }

    /**
     * 返回最后活动点
     */
    get point() {
        return this._point;
    }

    /**
     * 加载点
     * @param {Object} data 
     */
    loadPoint(data) {
        return this.createPoint(data);
    }

    /**
     * 返回点数据用于加载点
     */
    getData() {
        return this._pointData;
    }

    /**
     * 开始绘制点
     */
    startCreate() {
        var $this = this;
        this.handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        this.handler.setInputAction(function (evt) { //单机开始绘制
            var cartesian = $this.getCatesian3FromPX(evt.position);
            if (!cartesian) return;
            var point = $this.createPoint(cartesian);
            $this._pointData = cartesian;
            $this._point = point;
            if (typeof $this.callback == "function") {
                $this.callback(point);
            }
        }, $this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    /**
     * 创建点
     * @param {*} cartesian 
     */
    createPoint(cartesian) {
        var $this = this;
        var point = this.viewer.entities.add({
            position: cartesian,
            point: {
                pixelSize: 10,
                color: $this.Cesium.Color.YELLOW,
            }
        });
        $this._entities.push(point); //加载脏数据
        return point;
    }

    /**
     * 销毁鼠标事件
     */
    destroy() {
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
    }

    //清空实体对象
    clear() {
        for (var i = 0; i < this._entities.length; i++) {
            this.viewer.entities.remove(this._entities[i]);
        }
        this._entities = [];
        this._point = null;
    }

    /**
     * 获取地理位置坐标
     * @param {*} px 
     */
    getCatesian3FromPX(px) {
        var cartesian;
        var ray = this.viewer.camera.getPickRay(px);
        if (!ray) return null;
        cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
        return cartesian;
    }
}