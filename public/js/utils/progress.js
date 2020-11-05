function progressAlpha() {
    var tag = false,
        ox = 0,
        left = 0,
        bgleft = 0;
    var long = parseInt($('#progress-alpha').width());
    $('#progress-btn-alpha').mousedown(function (e) {
        ox = e.pageX - left;
        tag = true;
    });
    $(document).mouseup(function () {
        tag = false;
    });
    $('#progress-alpha').mousemove(function (e) { //鼠标移动
        if (tag) {
            left = e.pageX - ox;
            if (left <= 0) {
                left = 0;
            } else if (left > long) {
                left = long;
            }
            $('#progress-btn-alpha').css('left', left);
            $('#progress-bar-alpha').width(left);
            $('#text-alpha').html(parseInt((left / long) * 100) + '%');
        }
    });
    $('#progress-bg-alpha').click(function (e) { //鼠标点击
        if (!tag) {
            bgleft = $('#progress-bg-alpha').offset().left;
            left = e.pageX - bgleft;
            if (left <= 0) {
                left = 0;
            } else if (left > long) {
                left = long;
            }
            $('#progress-btn-alpha').css('left', left);
            $('#progress-bar-alpha').animate({
                width: left
            }, long);
            $('#text-alpha').html(parseInt((left / long) * 100) + '%');
        }
    });
}