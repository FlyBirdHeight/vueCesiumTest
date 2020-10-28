/** 
 * 绘制折线 
 */
import Handle from '../handle/handle.js'
class DrawPolyline {
    constructor(arg) {
        this.viewer = arg.viewer;
        this.Cesium = require('cesium/Cesium');
        this.callback = arg.callback;
        this.data = arg.data;
        this._polyline = null; //活动线
        this._polylineLast = null; //最后一条线
        this._positions = []; //活动点
        this._entities_point = []; //脏数据
        this._entities_line = []; //脏数据
        this._polylineData = null; //用于构造线数据
        this.handle = new Handle();
        this.handleDistance = []; //处理距离的数组
    }

    /**
     * 返回最后活动线
     */
    get line() {
        return this._polylineLast;
    }

    /**
     * 返回线数据用于加载线
     */
    getData() {
        return this._polylineData;
    }

    //加载线
    loadPolyline(data) {
        var $this = this;
        var polyline = this.viewer.entities.add({
            id: $this.data.id,
            description: $this.data.description,
            name: $this.data.name,
            polyline: {
                positions: data,
                show: $this.data.show,
                material: $this.data.polyline.material,
                width: $this.data.polyline.width,
                arcType: $this.data.polyline.arcType,
                classificationType: $this.data.polyline.classificationType,
                shadows: $this.data.polyline.shadows,
                zIndex: Number($this.data.polyline.zIndex)
            }
        });
        return polyline;
    }

    /**
     * 开始创建
     */
    dynamicDraw() {
        var $this = this;
        this.handleData();
        this.handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        this.handler.setInputAction(function (evt) { //单机开始绘制
            //屏幕坐标转地形上坐标
            var cartesian = $this.getCatesian3FromPX(evt.position);
            if ($this._positions.length == 0) {
                $this._positions.push(cartesian.clone());
            }
            $this._positions.push(cartesian);
            $this.handleDistance.push(cartesian);
            if ($this.handleDistance.length >= 2) {
                var returnDatra = $this.handle.distance($this.handleDistance[$this.handleDistance.length - 2], $this.handleDistance[$this.handleDistance.length - 1])
                $this.handle.addLabel($this.viewer, {
                    position: returnDatra.center,
                    text: returnDatra.length
                })
            }
            $this.createPoint(cartesian); // 绘制点
        }, $this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
        this.handler.setInputAction(function (evt) { //移动时绘制线
            if ($this._positions.length < 1) return;
            var cartesian = $this.getCatesian3FromPX(evt.endPosition);
            if (!$this.Cesium.defined($this._polyline)) {
                $this._polyline = $this.createPolyline();
            }
            if ($this._polyline) {
                $this._positions.pop();
                $this._positions.push(cartesian);
            }
        }, $this.Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        this.handler.setInputAction(function (evt) {
            if (!$this._polyline) return;
            var cartesian = $this.getCatesian3FromPX(evt.position);
            $this._positions.pop();
            $this._positions.push(cartesian);
            $this.createPoint(cartesian); // 绘制点
            $this._polylineData = $this._positions.concat();
            $this.viewer.entities.remove($this._polyline); //移除
            $this._polyline = null;
            $this._positions = [];
            var line = $this.loadPolyline($this._polylineData); //加载线
            $this._entities_line.push(line)
            $this._polylineLast = line;
            if (typeof $this.callback == "function") {
                $this.callback(line);
            }
        }, $this.Cesium.ScreenSpaceEventType.RIGHT_CLICK);
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
                pixelSize: 5,
                color: $this.Cesium.Color.YELLOW,
            }
        });
        $this._entities_point.push(point);
        return point;
    }

    /**
     * 创建折线
     */
    createPolyline() {
        var $this = this;
        var polyline = this.viewer.entities.add({
            id: $this.data.id,
            description: $this.data.description,
            name: $this.data.name,
            polyline: {
                positions: new $this.Cesium.CallbackProperty(function () {
                    return $this._positions
                }, false),
                show: $this.data.show,
                material: $this.data.polyline.material,
                width: $this.data.polyline.width,
                arcType: $this.data.polyline.arcType,
                classificationType: $this.data.polyline.classificationType,
                shadows: $this.data.polyline.shadows,
                zIndex: Number($this.data.polyline.zIndex)
            }
        });
        $this._entities_line.push(polyline);
        return polyline;
    }

    /**
     * 销毁handle对象
     */
    destroy() {
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
    }

    /**
     * 清空实体对象
     */
    reset() {
        for (var i = 0; i < this._entities_point.length; i++) {
            this.viewer.entities.remove(this._entities_point[i]);
        }
        for (var i = 0; i < this._entities_line.length; i++) {
            this.viewer.entities.remove(this._entities_line[i]);
        }
        this._polyline = null;
        this._positions = [];
        this._entities_point = []; //脏数据
        this._entities_line = []; //脏数据
        this._polylineData = null; //用于构造线数据
        this.viewer.entities.add(this._polylineLast)
        this._polylineLast = null;

        return this.viewer
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
     * 处理数据
     */
    handleData() {
        let $this = this;
        let data = this.data.polyline;
        let Cesium = this.Cesium;
        //设置折线颜色
        let color = data.material_color
        color = color.substring(5, color.length - 1)
        color = color.split(',')
        color = new Cesium.Color(Number(color[0]) / 255, Number(color[1]) / 255, Number(color[2]) / 255, Number(color[3]))
        //折线间隔颜色
        let gapColor = data.gapColor
        gapColor = gapColor.substring(4, gapColor.length - 1)
        gapColor = gapColor.split(',')
        gapColor = new Cesium.Color(Number(gapColor[0]) / 255, Number(gapColor[1]) / 255, Number(gapColor[2]) / 255)
        //折线外框颜色
        let outlineColor = data.outlineColor
        outlineColor = outlineColor.substring(4, outlineColor.length - 1)
        outlineColor = outlineColor.split(',')
        outlineColor = new Cesium.Color(Number(outlineColor[0]) / 255, Number(outlineColor[1]) / 255, Number(outlineColor[2]) / 255)
        if (this.data.polyline.dash) {
            data.material = new Cesium.PolylineDashMaterialProperty({
                color: color,
                gapColor: gapColor,
                dashLength: $this.data.polyline.dashLength
            })
        } else if (this.data.polyline.outline) {
            data.material = new Cesium.PolylineOutlineMaterialProperty({
                color: color,
                outlineWidth: Number(outlineWidth),
                outlineColor: outlineColor
            });
        } else {
            data.material = color;
        }
        data.arcType = data.arcType == 'NONE' ? Cesium.ArcType.NONE : data.arcType == 'RHUMB' ? Cesium.ArcType.RHUMB : Cesium.ArcType.GEODESIC;

        data.shadows = data.shadows == 'DISABLED' ? Cesium.ShadowMode.DISABLED : data.shadows == 'ENABLED' ? Cesium.ShadowMode.ENABLED : data.shadows == 'CAST_ONLY' ? Cesium.ShadowMode.CAST_ONLY : Cesium.ShadowMode.RECEIVE_ONLY
        data.classificationType = data.classificationType == 'TERRAIN' ? Cesium.ClassificationType.TERRAIN : data.classificationType == 'CESIUM_3D_TILE' ? Cesium.ClassificationType.CESIUM_3D_TILE : Cesium.ClassificationType.BOTH;

        this.data.polyline = data;
    }
}

export default DrawPolyline