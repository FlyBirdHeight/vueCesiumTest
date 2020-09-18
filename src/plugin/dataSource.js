var Cesium = require('cesium/Cesium');
//通过名称获取
function getDataSourceByName(name,viewer){
    var returnData = viewer.dataSources.getByName(name);
    if (returnData.length != 0) {
        return returnData
    }
    return null;
}
//数据源下移
function lowerDataSource(name,viewer){
    let dataSource = this.getDataSourceByName(name,viewer);
    if(dataSource == null){
        return false;
    }
    viewer.dataSources.lower(dataSource)
    return true;
}
//删除
function removeDataSource(name,viewer){
    let dataSource = this.getDataSourceByName(name,viewer);
    if(dataSource == null){
        return false;
    }
    viewer.dataSources.remove(dataSource);
    return true;
}
//删除dataSource中全部数据
function removeDataSourceAll(viewer){
    viewer.dataSources.removeAll();
    return true;
}
//获取dataSource
function getAllDataSource(viewer){
    let dataSources = viewer.dataSources._dataSources;
    return dataSources;
}

export default {
    install: function (Vue) {
        Vue.prototype.$getDataSourceByName = (name, viewer) => getDataSourceByName(name, viewer)
        Vue.prototype.$lowerDataSource = (name, viewer) => lowerDataSource(name, viewer)
        Vue.prototype.$removeDataSource = (name, viewer) => removeDataSource(name, viewer)
        Vue.prototype.$removeDataSourceAll = (viewer) => removeDataSourceAll(viewer)
        Vue.prototype.$getAllDataSource = (viewer) => getAllDataSource(viewer)
    }
}