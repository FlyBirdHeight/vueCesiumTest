/**
 * 坐标页，控制坐标点显示隐藏
 */
function closePosition(number) {
    if ($("#position-list-member" + number + "-info").hasClass("hidden")) {
        $("#position-list-member" + number + "-info").removeClass("hidden");
        $("#hidePositionMember" + number).removeClass("hidden");
        $("#showPositionMember" + number).addClass("hidden");
    } else {
        $("#position-list-member" + number + "-info").addClass("hidden");
        $("#showPositionMember" + number).removeClass("hidden");
        $("#hidePositionMember" + number).addClass("hidden");
    }
};

/**
 * 坐标页，点处点击加号事件
 */
function addPositionPoint() {
    console.log("addPositionPoint");
};

/**
 * 坐标页，点处点击垃圾桶事件
 */
function removePositionPoint(number) {
    $('#position-list-member' + number).remove();
    attrData.positionPoint.splice((number - 1), 1);
    let data = attrData.positionPoint;
    for (let index = 0; index < data.length; index++) {
        console.log(data[index].id + "::::" + number);
        if (data[index].id >= number) {
            data[index].address = data[index].address - 1;
            $('#position-point-title-' + data[index].id).text("第" + data[index].address + "点");
        }
    }
}