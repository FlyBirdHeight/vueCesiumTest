/**
 * 本页中方法主要用来处理属性编辑栏中的坐标页内容
 */

/**
 * 关闭全部坐标页 
 */
function closeAllPosition() {
    if ($('#hidePositionAll').hasClass('hidden')) {
        $('#hidePositionAll').removeClass('hidden');
        $('#showPositionAll').addClass('hidden');
        $('#position-list').removeClass('hidden');
    } else {
        $('#showPositionAll').removeClass('hidden');
        $('#hidePositionAll').addClass('hidden');
        $('#position-list').addClass('hidden');
    }
}
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
    let removeId = number;
    let spliceIndex = 0;
    let data = attrData.positionPoint;
    for (let index = 0; index < data.length; index++) {
        if (data[index].id == number) {
            spliceIndex = index;
            break;
        }
    }
    $('#position-list-member' + removeId).remove();
    attrData.positionPoint.splice(spliceIndex, 1);
    for (let index = 0; index < attrData.positionPoint.length; index++) {
        if (attrData.positionPoint[index].id > removeId) {
            attrData.positionPoint[index].address = attrData.positionPoint[index].address - 1;
            $('#position-point-title-' + attrData.positionPoint[index].id).text("第" + attrData.positionPoint[index].address + "点");
        }
    }

}