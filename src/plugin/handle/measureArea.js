class MeasureArea {
    constructor() {
        this.Cesium = require('cesium/Cesium')
        this.radiansPerDegree = Math.PI / 180.0; //角度转化为弧度(rad)
        this.degreesPerRadian = 180.0 / Math.PI; //弧度转化为角度
        this.res = 0;
    }

    /**
     * 获取角度
     * @param {*} p1 
     * @param {*} p2 
     * @param {*} p3
     * @returns {Number} angle
     */
    angle(p1, p2, p3) {
        var firstAngle = this.Bearing(p2, p1);
        var secondAngle = this.Bearing(p2, p3);
        var angle = firstAngle - secondAngle;
        if (angle < 0) {
            angle += 360;
        }
        return angle;
    }

    /**
     * 获取方向
     * @param {*} from 
     * @param {*} to 
     */
    Bearing(from, to) {
        from = this.Cesium.Cartographic.fromCartesian(from);
        to = this.Cesium.Cartographic.fromCartesian(to);
        var lat1 = from.latitude;
        var lon1 = from.longitude;
        var lat2 = to.latitude;
        var lon2 = to.longitude;
        var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
        if (angle < 0) {
            angle += Math.PI * 2.0;
        }
        angle = angle * this.degreesPerRadian; //角度
        return angle;
    }

    /**
     * 获取两点之间的距离
     * @param {*} point1 
     * @param {*} point2 
     */
    distance(point1, point2) {
        var point1cartographic = this.Cesium.Cartographic.fromCartesian(point1);
        var point2cartographic = this.Cesium.Cartographic.fromCartesian(point2);
        /**
         * 根据经纬度计算出距离
         */
        var geodesic = new this.Cesium.EllipsoidGeodesic();
        geodesic.setEndPoints(point1cartographic, point2cartographic);
        var distance = geodesic.surfaceDistance;
        //返回两点之间的距离
        distance = Math.sqrt(Math.pow(distance, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
        return distance;
    }

    /**
     * 计算面积
     * @param {*} points 
     */
    getArea(points) {
        var res = 0;
        //拆分三角曲面
        for (var i = 0; i < points.length - 2; i++) {
            var j = (i + 1) % points.length;
            var k = (i + 2) % points.length;
            var totalAngle = this.angle(points[i], points[j], points[k]);

            var dis_temp1 = this.distance(points[j], points[0]);
            var dis_temp2 = this.distance(points[k], points[0]);
            res += dis_temp1 * dis_temp2 * Math.sin(totalAngle) / 2;
            // console.log(res);
        }
        if (res < 1000000) {
            res = Math.abs(res).toFixed(4) + " 平方米";
        } else {
            res = Math.abs((res / 1000000.0).toFixed(4)) + " 平方公里";
        }

        return res;
    }

    /**
     * 获取图形重心
     * @param {Array} mPoints
     */
    getCenterOfGravityPoint(mPoints) {
        var centerPoint = mPoints[0];
        for (var i = 1; i < mPoints.length; i++) {
            centerPoint = this.Cesium.Cartesian3.midpoint(centerPoint, mPoints[i], new this.Cesium.Cartesian3());
        }
        return centerPoint;
    }
}

export default MeasureArea