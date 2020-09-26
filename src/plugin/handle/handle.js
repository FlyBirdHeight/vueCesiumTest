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
    distance(firstPoint, secondPotint) {
        let length = this.Cesium.Cartesian3.distance(firstPoint, secondPoint);
        let center = Cesium.Cartesian3.midpoint(firstPoint, secondPotint, new Cesium.Cartesian3());
        return {
            length: length,
            center: center
        }
    }

    /**
     * 添加文字
     */
    addLabel(viewer, data) {
        viewer.entities.add({
            id:
        })
    }
}

export default Handle