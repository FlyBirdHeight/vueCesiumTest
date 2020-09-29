/**
 * 动态抛物线的绘制
 */
class DrawParabola {
    constructor(arg) {
        this.arg = arg;
        this.data = arg.data;
        this.Cesium = undefined;
        this.duration = undefined;
        this.color = undefined;
        this._time = undefined;
        this._color = undefined;
        this._colorSubscription = undefined;
        this._definitionChanged = undefined;
        this.pointArr = [];
    }

    /**
     * 自定义property，设置其参数
     */
    ParabolaProperty() {
        this._definitionChanged = new Cesium.Event();
        this.viewer = this.arg.viewer;
        this.Cesium = this.arg.Cesium;
        this.duration = this.arg.duration;
        this.color = this.arg.color;
        this._time = (new Date()).getTime();
        this._color = undefined;
        this._colorSubscription = undefined;
    }

    /**
     * 添加自定义property，此方法在文档中是无法查看到的，但是本质就是Object.defineProperties,自定义一个属性
     */
    defineProperty() {
        let _this = this;
        this.Cesium.defineProperties(ParabolaProperty.prototype, {
            configurable: false,
            enumerable: true,
            isConstant: {
                get: function () {
                    return false;
                }
            },
            definitionChanged: {
                get: function () {
                    return _this._definitionChanged;
                }
            },
            duration: {
                get: function () {
                    return _this.duration
                }
            },
            time: _this.Cesium.createPropertyDescriptor('time'),
            //这个方法也是在文档中是没有的，但是在cesium中也是可以找到的,主要作用就是为了规范property中的数据规范能够符合property的
            color: _this.Cesium.createPropertyDescriptor('color')
        })
    }

    /**
     * 设置自定义property相关的方法
     */
    setDefineProperty() {
        let _this = this;
        this.ParabolaProperty.prototype.getType = function () {
            return 'ParabolaProperty'
        }

        this.ParabolaProperty.prototype.getValue = function (time, result) {
            if (!_this.Cesium.defined(result)) {
                result = {};
            }
            result.color = _this.Cesium.Property.getValueOrClonedDefault(_this._color, time, _this.Cesium.Color.WHITE, result.color);
            result.image = _this.Cesium.Material.ParabolaPropertyImage;
            result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
            return result;
        }

        this.ParabolaProperty.prototype.equals = function (other) {
            return _this === other || (other instanceof ParabolaProperty &&
                Cesium.Property.equals(_this._color, other._color))
        }

        this.Cesium.ParabolaProperty = this.ParabolaProperty;
        this.Cesium.Material.ParabolaPropertyType = 'ParabolaProperty';
        this.Cesium.Material.ParabolaPropertyImage = '../../img/parabola_line.png';
        //这个其实就是opengl或者是webgl中的东西了，设置其材质，可以在opengl中查看到，是顶点着色器那一块的知识
        this.Cesium.Material.ParabolaPropertySource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
        {\n\
             czm_material material = czm_getDefaultMaterial(materialInput);\n\
             vec2 st = materialInput.st;\n\
             vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
             material.alpha = colorImage.a * color.a;\n\
             material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
             return material;\n\
         }";
        //这个方法可以在cesium中source/scene/Material.js中找到，主要是添加一个新的material
        this.Cesium.Material._materialCache.addMaterial(this.Cesium.Material.ParabolaPropertyType, {
            fabric: {
                type: _this.thisCesium.Material.ParabolaPropertyType,
                uniforms: {
                    color: new _this.Cesium.Color(1.0, 0.0, 0.0, 0.5),
                    image: _this.Cesium.Material.ParabolaPropertyImage,
                    time: 0
                },
                source: Cesium.Material.ParabolaPropertySource
            },
            //半透明设置
            translucent: function (material) {
                return true;
            }
        })
    }

    /**
     * 抛物线方程的实现
     */
    parabolaEquation(options, resultOut) {
        //抛物线方程 y=-(4h/L^2)*x^2+h x^2前的系数为-时，开口向下，且越大，开口越大
        //抛物线顶点高度
        var height = options.height && options.height > 5000 ? options.height : 5000;
        let distance_lon = Math.abs(options.pt1.lon - options.pt2.lon);
        let distance_lat = Math.abs(options.pt1.lat - options.pt2.lat);
        //横纵间距大小
        var length = distance_lon > distance_lat ? distance_lon : distance_lat;
        var num = options.num && options.num > 50 ? options.num : 50;
        var result = [];
        var dlt = length / num;
        if (distance_lon > distance_lat) {
            var delLat = (options.pt2.lat - options.pt1.lat) / num;
            if (options.pt1.lon - options.pt2.lon > 0) {
                dlt = -dlt;
            }
            for (var i = 0; i < num; i++) {
                var tempH = height - Math.pow((-0.5 * length + Math.abs(dlt) * i), 2) * 4 * height / Math.pow(length, 2);
                var lon = options.pt1.lon + dlt * i;
                var lat = options.pt1.lat + delLat * i;
                result.push([lon, lat, tempH]);
            }
        } else {
            var delLon = (options.pt2.lon - options.pt1.lon) / num;
            if (options.pt1.lat - options.pt2.lat > 0) {
                dlt = -dlt;
            }
            for (var i = 0; i < num; i++) {
                var tempH = height - Math.pow((-0.5 * length + Math.abs(dlt) * i), 2) * 4 * height / Math.pow(length, 2);
                var lon = options.pt1.lon + delLon * i;
                var lat = options.pt1.lat + dlt * i;
                result.push([lon, lat, tempH]);
            }
        }

        if (resultOut != undefined) {
            resultOut = result;
        }
        return result;
    }

    /**
     * 完成Cesium扩展Property
     */
    createProperty() {
        this.ParabolaProperty();
        this.defineProperty();
        this.setDefineProperty();
    }

    /**
     * 
     */
    createParabola() {
        let _this = this;
        var material = new this.Cesium.ParabolaProperty(this.data.color, this.data.time);
        for (let i = 0; i < this.data.endPoint.length; i++) {
            var points = this.parabolaEquation({
                pt1: this.data.center,
                pt2: this.data.endPoint[i],
                height: this.data.height,
                num: this.data.num
            });
            for (var i = 0; i < points.length; i++) {
                pointArr.push(points[i][0], points[i][1], points[i][2]);
            }
            this.viewer.entities.add({
                id: 'ParabolaLength:' + j + '  ' + this.data.id,
                name: 'Parabola:' + j + '   ' + this.data.name,
                description: this.data.description,
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(pointArr),
                    width: 2,
                    material: material
                }
            });
        }
        this.viewer.entities.add({
            id: 'centerPoint',
            name: '起始点',
            description: '流动纹理线的起始点',
            position: _this.Cesium.Cartesian3.fromDegrees(center.lon, center.lat, 1),
            point: {
                pixelSize: 6,
                color: _this.Cesium.Color.BLUE
            }
        });
        for (var i = 0; i < this.data.endPoint.length; i++) {
            this.viewer.entities.add({
                id: 'endPoint:'+i,
                name: '终止点:'+i,
                description: '流动纹理线的终止点',
                position: _this.Cesium.Cartesian3.fromDegrees(this.data.endPoint[i].lon, this.data.endPoint[i].lat, 1),
                point: {
                    pixelSize: 6,
                    color: Cesium.Color.RED
                }
            });
        }
    }
}

export default DrawParabola;