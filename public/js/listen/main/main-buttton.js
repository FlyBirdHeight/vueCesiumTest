/**
 * 本页种方法主要用来处理标绘页中的方法
 */
/**
 * 绘制目标选取，字体点图片，数据读取
 */
function drawOnCesiumGlobeByIcon(number){
    let data = getSessionData('plotting');
    if(data.length == 0 || data.icon_list.length == 0){
        return false;
    }
    let icon = data.icon_list;
    console.log(icon[number])
}

/**
 * 绘制目标选取，点、文字，数据读取
 */
function drawOnCesiumGlobeByPointLabel(number){
    let data = getSessionData('plotting');
    if(data.length == 0 || data.point_label.length == 0){
        return false;
    }
    let pointLabel = data.point_label;
    console.log(pointLabel[number])
}

/**
 * 绘制目标选取，gltf模型，数据读取
 */
function drawOnCesiumGlobeByGltf(number){
    let data = getSessionData('plotting');
    if(typeof(data) == 'undefined' || data.gltf_list.length == 0){
        return false;
    }
    let pointLabel = data.gltf_list;
    console.log(pointLabel[number])
}

/**
 * 绘制目标选取，2d模型，数据读取
 */
function drawOnCesiumGlobeByTwo(number){
    let data = getSessionData('plotting');
    if(typeof(data) == 'undefined' || data.two.length == 0){
        return false;
    }
    let pointLabel = data.two;
    console.log(pointLabel[number])
}

/**
 * 绘制目标选取，3d模型，数据读取
 */
function drawOnCesiumGlobeByThree(number){
    let data = getSessionData('plotting');
    if(typeof(data) == 'undefined' || data.three.length == 0){
        return false;
    }
    let pointLabel = data.three;
    console.log(pointLabel[number])
}

/**
 * 绘制目标选取，军事标绘模型，数据读取
 */
function drawOnCesiumGlobeByMilitary(number){
    let data = getSessionData('plotting');
    if(typeof(data) == 'undefined' || data.military.length == 0){
        return false;
    }
    let pointLabel = data.military;
    console.log(pointLabel[number])
}