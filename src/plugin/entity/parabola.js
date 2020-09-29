/**
 * 动态抛物线的绘制
 */
class DrawParabola {
    constructor(arg) {
        this.arg = arg;
        this.Cesium = undefined;
        this.duration = undefined;
        this.color = undefined;
        this._time = undefined;
        this._color = undefined;
        this._colorSubscription = undefined;
        this._definitionChanged = undefined;
    }

    /**
     * 自定义property，设置其参数
     */
    ParabolaProperty() {
        this._definitionChanged = new Cesium.Event();
        this.viewer = this.arg.viewer;
        this.Cesium = require('cesium/Cesium');
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
        this.Cesium.Material.ParabolaPropertyImage = '';
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
}

export default DrawParabola;