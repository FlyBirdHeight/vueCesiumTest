/**
 * 这个js文件主要是处理set这个窗口，底部按钮的事件
 */
/**
 * 关闭设置页面
 */
function closeSetting() {
    $("#navDataSet").addClass("hidden");
}
/**
 * 设置显示页面
 */
function setActive(type) {
    this.resetActive();
    switch (type) {
        case "style":
            $("#setStyle").addClass("active");
            $("#styleSet").removeClass("hidden");
            break;
        case "position":
            $("#positionSet").removeClass("hidden");
            $("#setPosition").addClass("active");
            break;
        case "class":
            $("#classSet").removeClass("hidden");
            $("#setClass").addClass("active");
            break;
        default:
            break;
    }
}
/**
 * 重置所有选中状态
 */
function resetActive() {
    $("#setStyle").removeClass("active");
    $("#setPosition").removeClass("active");
    $("#setClass").removeClass("active");
    $("#styleSet").addClass("hidden");
    $("#positionSet").addClass("hidden");
    $("#classSet").addClass("hidden");
}