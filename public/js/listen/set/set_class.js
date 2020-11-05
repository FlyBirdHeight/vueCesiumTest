/**
 * 获取类型不同对应的样式信息
 * @param type 
 */
function getDifferentForm(data) {
    switch (data.type) {
        //带有label的点
        case 'pointWithLabel':
            break;
            //文字
        case 'label':
            break;
            //电子版带有label
        case 'billboardWithLabel':
            break;
            //普通电子版
        case 'billboard':
            break;
            //gltf模型
        case 'gltf':
            break;
            //圆    
        case 'circle':
            break;
            //椭圆
        case 'ellipse':
            break;
            //弓形
        case 'arcuate':
            break;
            //平面
        case 'plane':
            break
            //走廊
        case 'corridor':
            break;
            //围墙
        case 'wall':
            break;
            //3D围墙
        case '3D-wall':
            break;
            //3D圆柱体
        case '3D-cylinder':
            break;
            //3D圆锥体
        case '3D-cone':
            break;
            //3D球体
        case '3D-sphere':
            break;
            //3D多边形
        case '3D-polygon':
            break;
        case 'military':
            break;
        default:
            break;
    }
}

function handleHtmlWallData(data) {
    var returnData = [];
    for (let i = 0; i < data.length; i++) {

    }
    let type = `<tr id="position-point-lon-1" style="height:40px;">
        <td style="padding-left:5px;width:40%;font-size:12px">` + data.des + `:</td>
        <td style="padding-left:5px">
            <span style="font-size:13px;font-weight:bolder">` + data.data + `</span>
        </td>
    </tr>`;
    let height = `<tr id="position-point-lon-1" style="height:40px;">
        <td style="padding-left:5px;width:40%;font-size:12px">` + data.des + `:</td>
        <td style="padding-left:5px">
        <input
            id="class-info-current-height"
            type="number"
            value="` + data.data + `"
            class="form-control"
            style="margin-right:10px;width:90%;height:24px"
        />
        </td>
    </tr>`
}

/**
 * 样式页，控制展示样式信息
 */
function showClassInfo() {
    if ($("#class-info-list").hasClass("hidden")) {
        $("#class-info-list").removeClass("hidden");
        $("#showClassInfoAll").addClass("hidden");
        $("#hideClassInfoAll").removeClass("hidden");
    } else {
        $("#class-info-list").addClass("hidden");
        $("#hideClassInfoAll").addClass("hidden");
        $("#showClassInfoAll").removeClass("hidden");
    }
}