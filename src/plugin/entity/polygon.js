/**
 * 动态绘制多边形
 */
class DrawPolygon {
    /**
     * 初始化
     * @param {Object} arg 
     */
    constructor(arg) {
        this.viewer = arg.viewer;
        this.Cesium = require('cesium/Cesium');
        this.callback = arg.callback;
        this.data = arg.data;
        this._polygon = null;  //活动面
        this._polygonLast = null;  //最后一个面
        this._positions = []; //活动点
        this._entities_point = [];  //脏数据
        this._entities_polygon = [];  //脏数据
        this._polygonData = null; //用户构造面
    }

    /**
     * 加载多边形
     */
    loadPolygon() {
        let _this = this;
        return _this.viewer.entities.add({
            polygon: {
                show: _this.data.show,
                fill: _this.data.polygon.fill,
                material: _this.data.polygon.material,
                outline: _this.data.polygon.outline,
                outlineColor: _this.data.polygon.outlineColor,
                outlineWidth: _this.data.polygon.outlineWidth,
                height: _this.data.height,
                extrudedHeight: _this.data.polygon.extrudedHeight,
                hierarchy: new Cesium.CallbackProperty(function () {
                    return _this.data.polygon.hierarchy
                }, false),
                closeTop: _this.data.polygon.closeTop
            }
        })
    }

    /**
     * 绘制临时点
     */
    createPoint() {
        let _this = this
        _this.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(Number(data.position.lon), Number(data.position.lat), Number(data.height)),
            id: data.id,
            name: data.name,
            description: data.description,
            point: {
                color: Cesium.Color.DARKRED,
                outlineColor: Cesium.Color.WHITE,
                pixelSize: 10,
                outlineWidth: 1
            }
        })
    }

    /**
     * 创建多边形
     */
    createPolygon() {
        var _this = this;
        var polygon = this.viewer.entities.add({
            id: _this.data.id,
            name: _this.data.name,
            description: _this.data.description,
            polygon: {
                show: _this.data.show,
                fill: _this.data.polygon.fill,
                material: _this.data.polygon.material,
                outline: _this.data.polygon.outline,
                outlineColor: _this.data.polygon.outlineColor,
                outlineWidth: _this.data.polygon.outlineWidth,
                height: _this.data.height,
                extrudedHeight: _this.data.polygon.extrudedHeight,
                hierarchy: new Cesium.CallbackProperty(function () {
                    return _this.data.polygon.hierarchy
                }, false),
                closeTop: _this.data.polygon.closeTop
            }
        });
        _this._entities_polygon.push(polygon);
        return polygon;
    }

    /**
     * 获取多边形
     */
    get polygon() {
        return this._polygonLast;
    }

    /**
     * 返回面数据用于加载面
     */
    getData() {
        return this._polygonData;
    }

    /**
     * 动态绘制图形
     */
    dynamicDraw() {
        var $this = this;
        this.handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        this.handler.setInputAction(function (mouse) { //单机开始绘制
            var cartesian = $this.getCatesian3FromPX(mouse.position);
            if ($this._positions.length == 0) {
                $this._positions.push(cartesian.clone());
            }
            $this.createPoint(cartesian);
            $this._positions.push(cartesian);
        }, $this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
        this.handler.setInputAction(function (mouse) { //移动时绘制面
            if ($this._positions.length < 1) return;
            var cartesian = $this.getCatesian3FromPX(mouse.endPosition);
            if ($this._positions.length == 3) {
                if (!$this.Cesium.defined($this._polygon)) {
                    $this._polygon = $this.createPolygon();
                }
            }
            $this._positions.pop();
            $this._positions.push(cartesian);
        }, $this.Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        this.handler.setInputAction(function (evt) {
            if (!$this._polygon) return;
            var cartesian = $this.getCatesian3FromPX(evt.position);
            $this._positions.pop();
            $this._positions.push(cartesian);
            $this.createPoint(cartesian);
            $this._polygonData = $this._positions.concat();
            $this.viewer.entities.remove($this._positions); //移除
            $this._positions = null;
            $this._positions = [];
            var Polygon = $this.loadPolygon($this._polygonData);
            $this._entities_polygon.push(Polygon);
            $this._polygonLast = Polygon;
            if (typeof $this.callback == "function") {
                $this.callback(Polygon);
            }
        }, $this.Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    /**
     * 销毁事件
     */
    destroy() {
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
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

    /**
     * 重置对象属性
     */
    reset() {
        for (var i = 0; i < this._entities_point.length; i++) {
            this.viewer.entities.remove(this._entities_point[i]);
        }
        for (var i = 0; i < this._entities_polygon.length; i++) {
            this.viewer.entities.remove(this._entities_polygon[i]);
        }
        this._polygon = null;  //活动面
        this._polygonLast = null;  //最后一个面
        this._positions = []; //活动点
        this._entities_point = [];  //脏数据
        this._entities_polygon = [];  //脏数据
        this._polygonData = null; //用户构造面

    }
}

export default DrawPolygon