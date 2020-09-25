/*
绘制圆
 */
class DrawCircle {
    constructor(arg) {
        this.viewer = arg.viewer;
        this.Cesium = require('cesium/Cesium');
        this.callback = arg.callback;
        this._cicle = null; //活动圆
        this.floatingPoint = null;
        this._cicleLast = null; //最后一个圆
        this._positions = [];  //活动点
        this._entities_point = [];  //脏数据
        this._entities_cicle = [];  //脏数据
        this._cicleData = null; //用于构造圆形数据
    }

    get cicle() {
        return this._cicleLast;
    }

    /**
     * 加载圆
     * @param {Object} data 
     */
    loadCicle(data) {
        var that = this;
        var position = data[0];
        var value = data;
        var r = Math.sqrt(
            Math.pow(value[0].x - value[value.length - 1].x, 2) +
            Math.pow(value[0].y - value[value.length - 1].y, 2)
        );
        var shape = this.viewer.entities.add({
            position: position,
            name: "circle",
            type: "circle",
            ellipse: {
                semiMinorAxis: r,
                semiMajorAxis: r,
                material: that.Cesium.Color.RED.withAlpha(0.5),
                outline: true
            }
        });
        return shape;
    }

    /**
     * 返回数据
     */
    getData() {
        return this._cicleData;
    }

    /**
     * 开始绘制
     */
    startCreate() {
        this.handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        this.viewer.scene.globe.depthTestAgainstTerrain = true;
        var $this = this;
        this.handler.setInputAction(function (evt) { //单机开始绘制
            $this.viewer.scene.globe.depthTestAgainstTerrain = true;
            //屏幕坐标转地形上坐标
            var cartesian = $this.getCatesian3FromPX(evt.position);
            if ($this._positions.length == 0) {
                $this._positions.push(cartesian.clone());
                $this.floatingPoint = $this.createPoint(cartesian);
            }
            if (!$this._cicle) {
                $this.createPoint(cartesian);// 绘制点
            }
            $this._positions.push(cartesian);
        }, $this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
        this.handler.setInputAction(function (evt) { //移动时绘制圆
            if ($this._positions.length < 1) return;
            var cartesian = $this.viewer.scene.pickPosition(evt.endPosition);// $this.getCatesian3FromPX(evt.endPosition);
            if (!$this.Cesium.defined($this._cicle)) {
                $this._cicle = $this.createCicle();
            }
            $this.floatingPoint.position.setValue(cartesian);
            if ($this._cicle) {
                $this._positions.pop();
                $this._positions.push(cartesian);
            }
        }, $this.Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        this.handler.setInputAction(function (evt) {
            if (!$this._cicle) return;
            $this.viewer.scene.globe.depthTestAgainstTerrain = false;
            var cartesian = $this.viewer.scene.pickPosition(evt.position); // $this.getCatesian3FromPX(evt.position);
            $this._positions.pop();
            $this._positions.push(cartesian);
            $this._cicleData = $this._positions.concat();
            $this.viewer.entities.remove($this._cicle); //移除
            $this._cicle = null;
            $this._positions = [];
            $this.floatingPoint.position.setValue(cartesian);
            var cicle = $this.loadCicle($this._cicleData); //加载
            $this._entities_cicle.push(cicle);
            $this._cicleLast = cicle;
            $this.clearPoint();
            if (typeof $this.callback == "function") {
                $this.callback(cicle);
            }
        }, $this.Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    //创建圆
    createCicle() {
        var that = this;
        var shape = this.viewer.entities.add({
            position: that._positions[0],
            name: "circle",
            type: "circle",
            ellipse: {
                semiMinorAxis: new that.Cesium.CallbackProperty(function () {
                    //半径 两点间距离
                    var r = Math.sqrt(
                        Math.pow(that._positions[0].x - that._positions[that._positions.length - 1].x, 2) +
                        Math.pow(that._positions[0].y - that._positions[that._positions.length - 1].y, 2)
                    );
                    return r ? r : r + 1;
                }, false),
                semiMajorAxis: new that.Cesium.CallbackProperty(function () {
                    var r = Math.sqrt(
                        Math.pow(that._positions[0].x - that._positions[that._positions.length - 1].x, 2) +
                        Math.pow(that._positions[0].y - that._positions[that._positions.length - 1].y, 2)
                    );
                    return r ? r : r + 1;
                }, false),
                material: that.Cesium.Color.RED.withAlpha(0.5),
                outline: true
            }
        });
        that._entities_cicle.push(shape);
        return shape;
    }

    //创建点
    createPoint(cartesian) {
        var $this = this;
        var point = this.viewer.entities.add({
            position: cartesian,
            point: {
                pixelSize: 10,
                color: $this.Cesium.Color.YELLOW,
            }
        });;
        $this._entities_point.push(point);
        return point;
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
     * 销毁鼠标事件
    */
    destroy() {
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
    }

    clearPoint() {
        for (var i = 0; i < this._entities_point.length; i++) {
            this.viewer.entities.remove(this._entities_point[i]);
        }
        this._entities_point = [];  //脏数据
    }

    clear() {
        for (var i = 0; i < this._entities_point.length; i++) {
            this.viewer.entities.remove(this._entities_point[i]);
        }
        for (var i = 0; i < this._entities_cicle.length; i++) {
            this.viewer.entities.remove(this._entities_cicle[i]);
        }
        this._cicle = null; //活动圆
        this.floatingPoint = null;
        this._cicleLast = null; //最后一个圆
        this._positions = [];  //活动点
        this._entities_point = [];  //脏数据
        this._entities_cicle = [];  //脏数据
        this._cicleData = null; //用于构造圆形数据
    }
}

export default DrawCircle