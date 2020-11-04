/**
 * 判断是否存在对应的session数据
 * @param {string} key 
 */
function sessionIsExist(data) {
    if(data == null){
        return false;
    }
    return true;
}

function getSessionData(key){
    let data = sessionStorage.getItem(key);
    if(!sessionIsExist(data)){
        return []
    }
    return JSON.parse(data);
}

/**
 * 清空标绘页的展示卡
 */
function clearPlottingMainList() {
    //清空展示列表中的所有子元素
    $('#select-draw-list').empty();
}