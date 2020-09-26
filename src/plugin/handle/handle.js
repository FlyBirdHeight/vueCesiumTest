class Handle {
    constructor() {
        this.Cesium = require('cesium/Cesium');
        this.labelList = [];
    }
    /**
     * 距离测量
     * @param {Object} firstPoint 
     * @param {Object} secondPotint 
     */
    distance(firstPoint, secondPoint) {
        var length = this.Cesium.Cartesian3.distance(firstPoint, secondPoint);
        if (length > 1000) {
            length = (length / 1000).toFixed(2) + " 公里";
        } else {
            length = length.toFixed(2) + " 米";
        }
        var centerPoint = this.Cesium.Cartesian3.midpoint(firstPoint, secondPoint, new this.Cesium.Cartesian3());
        return {
            length: "距离：" + length,
            center: centerPoint
        };
    }

    /**
     * 添加文字
     */
    addLabel(viewer, data) {
        let Cesium = this.Cesium
        let label = viewer.entities.add({
            id: 'label:' + new Date().getTime(),
            name: '距离标注',
            description: '折线距离标注',
            position: data.position,
            label: {
                font: 'small-caps bold 12px/1 sans-serif',
                fillColor: Cesium.Color(0, 206 / 255, 209 / 255),
                text: data.text,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            }
        })
        this.labelList.push(label);
    }
}

export default Handle