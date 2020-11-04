/**
 * 本页种方法主要用来处理标绘页中的方法
 */

/**
 * select选择框数据改变时，重新绘制内部html代码
 */
$(document).ready(function () {
    $("#select-draw-type").on('change', function () {
        let type = $('#select-draw-type').val();
        setHtmlToMainList(type);
    });
    $.getJSON('../../../data/plotting.json',function(data){
        sessionStorage.setItem('plotting', JSON.stringify(data));
    });
    setHtmlToMainList('pointLabel');
})

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