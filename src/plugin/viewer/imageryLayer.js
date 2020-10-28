import token from "../../config/token.js";
var Cesium = require('cesium/Cesium');
var TDU_Key = "f45e3d30658b0f0d4fbcee0421ef59af";

function imageryLayersInit(viewer) {
    //在线天地图影像服务地址(墨卡托投影)
    var TDT_IMG_W =
        "http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" +
        TDU_Key;
    //在线天地图影像中文标记服务(墨卡托投影)
    var TDT_CIA_W =
        "http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default.jpg&tk=" +
        TDU_Key;
    //在线天地图影像国境线标记服务(墨卡托投影)
    var TDT_IBO_W =
        "http://{s}.tianditu.gov.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=ibo&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default.jpg&tk=" +
        TDU_Key;

    let Img = new Cesium.WebMapTileServiceImageryProvider({
        //调用影响中文服务
        url: TDT_IMG_W, //url地址
        layer: "img_w", //WMTS请求的层名称
        style: "default", //WMTS请求的样式名称
        format: "tiles", //MIME类型，用于从服务器检索图像
        tileMatrixSetID: "GoogleMapsCompatible", //	用于WMTS请求的TileMatrixSet的标识符
        subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], //天地图8个服务器
        minimumLevel: 0, //最小层级
        maximumLevel: 18 //最大层级
    });
    viewer.imageryLayers.addImageryProvider(Img); //添加到cesium图层上

    let cia = new Cesium.WebMapTileServiceImageryProvider({
        //调用影响中文注记服务
        url: TDT_CIA_W,
        layer: "cia_w",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "GoogleMapsCompatible",
        subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], //天地图8个服务器
        minimumLevel: 0,
        maximumLevel: 18
    });
    viewer.imageryLayers.addImageryProvider(cia);

    let ibo = new Cesium.WebMapTileServiceImageryProvider({
        //调用影响中文注记服务
        url: TDT_IBO_W,
        layer: "ibo_w",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "GoogleMapsCompatible",
        subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], //天地图8个服务器
        minimumLevel: 0,
        maximumLevel: 18
    });
    viewer.imageryLayers.addImageryProvider(ibo);
}


export default {
    install: function (Vue) {
        Vue.prototype.$imageryLayersInit = (viewer) => imageryLayersInit(viewer)
    }
}