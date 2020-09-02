<template>
<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">设置几何体</el-menu-item>
    <el-menu-item index="3">添加czml文件</el-menu-item>
    <el-menu-item index="4">设置地形</el-menu-item>
    <el-menu-item index="5">设置运动轨迹</el-menu-item>
    <el-menu-item index="6">恢复视角位置</el-menu-item>
    <el-menu-item index="7">添加图层</el-menu-item>
    <div class="select-input">
        <el-autocomplete v-model="position.name" :fetch-suggestions="searchPosition" placeholder="输入查找地名" style="weight:200px" @select="clickPosition">
            <template slot-scope="{ item }">
                <div class="name">{{ item.name }}</div>
                <span class="addr">{{ item.address }}</span>
            </template>
        </el-autocomplete>
        <el-button size="mini" style="margin-left:10px" @click="cameraFlyTo">点击跳转</el-button>
    </div>
    <div id="mapDiv" v-show="false"></div>
</el-menu>
</template>

<script>
import token from "@/config/token.js";
export default {
    methods: {
        handleSelect(key, keyPath) {
            switch (key) {
                case "1":
                    break;
                case "2":
                    this.$store.commit("SET_LEFT_TITLE", "几何体设置");
                    this.$store.commit("SET_LEFT_DRAWER", new Boolean(true));
                    this.$store.commit("SET_LEFT_SUB_TITLE", "几何体添加");
                    break;
                case "3":
                    this.$store.commit("SET_LEFT_TITLE", "添加czml文件");
                    this.$store.commit("SET_LEFT_DRAWER", new Boolean(true));
                    break;
                case "4":
                    break;
                case "5":
                    break;
                case "6":
                    this.viewer.camera.flyTo({
                        destination: this.Cesium.Cartesian3.fromDegrees(
                            103.84,
                            31.15,
                            17850000
                        ),
                        orientation: {
                            heading: this.Cesium.Math.toRadians(348.4202942851978),
                            pitch: this.Cesium.Math.toRadians(-89.74026687972041),
                            roll: this.Cesium.Math.toRadians(0)
                        }
                    });
                    this.$store.commit("SET_VIEWER", this.viewer);
                    break;
                case "7":
                    break;
                default:
                    break;
            }
        },
        searchPosition(queryString, cb) {
            if (queryString.replace(/(^s*)|(s*$)/g, "").length == 0) {
                cb([]);
            } else {
                this.map = new T.Map("mapDiv");
                this.map.centerAndZoom(new T.LngLat(116.40969, 39.89945), 10);
                this.geoCoder = new T.Geocoder();
                var config = {
                    pageCapacity: 10,
                    onSearchComplete: this.localSearchResult //接收数据的回调函数
                };
                var localsearch = new T.LocalSearch(this.map, config);
                localsearch.search(queryString, 5);
                this.showData = cb;
            }
        },
        cameraFlyTo() {
            let view = this.viewer;
            this.destoryBillboard(view);
            view.camera.flyTo({
                destination: this.Cesium.Cartesian3.fromDegrees(
                    this.position.lon,
                    this.position.lat,
                    1000
                ),
                orientation: {
                    heading: this.Cesium.Math.toRadians(348.4202942851978),
                    pitch: this.Cesium.Math.toRadians(-89.74026687972041),
                    roll: this.Cesium.Math.toRadians(0)
                },
                complete: this.addSphere
            });
            this.$store.commit("SET_VIEWER", view);
        },
        localSearchResult(result) {
            this.map.clearOverLays();
            this.showData(result.getSuggests());
        },
        clickPosition(item) {
            this.map.clearOverLays();
            this.position.name = item.name;
            this.position.address = item.address;
            var ds = {
                keyWord: this.position.address + this.position.name
            };
            this.axios
                .get(
                    "http://api.tianditu.gov.cn/geocoder?ds=" +
                    JSON.stringify(ds) +
                    "}&tk=" +
                    token
                )
                .then(res => {
                    if (res.data.status == "0" && res.data.msg == "ok") {
                        this.position.lon = res.data.location.lon;
                        this.position.lat = res.data.location.lat;
                    } else {
                        this.$message.error("地址解析出错，请精确地址信息");
                    }
                })
                .catch(error => {
                    this.$message.error("地址解析出错，请精确地址信息");
                });
        },
        addSphere() {
            this.createBillboard(this.position, this.viewer);
        }
    },
    data() {
        return {
            activeIndex: "1",
            activeIndex2: "1",
            position: {
                name: "",
                address: "",
                lon: "",
                lat: ""
            },
            map: null,
            showData: null,
            geoCoder: null
        };
    },
    computed: {
        viewer: function () {
            return this.$store.state.viewer.viewer;
        }
    }
};
</script>

<style scoped>
.select-input {
    width: 300px;
    display: inline-block;
    float: right;
    margin-top: 10px;
}

.name {
    text-overflow: ellipsis;
    overflow: hidden;
}

.addr {
    font-size: 12px;
    color: #b4b4b4;
}
</style>
