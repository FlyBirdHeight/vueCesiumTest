/**
 * 处理属性页面中相关事件的方法
 */

/**
 * 属性页，展示和收起属性列表
 */
function showStyle() {
    if ($("#hideStyle").hasClass("hidden")) {
        $("#hideStyle").removeClass("hidden");
        $("#showStyle").addClass("hidden");
        $("#style-table").removeClass("hidden");
    } else {
        $("#hideStyle").addClass("hidden");
        $("#showStyle").removeClass("hidden");
        $("#style-table").addClass("hidden");
    }
}