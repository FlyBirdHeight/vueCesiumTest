/**
 * 本页中的方法主要用来处理各个栏目中，动态Html添加的操作
 */
/**
 * 模拟数据
 */
var attrData = {
    attr: [{
            type: "index_id",
            des: "主键",
            data: "20201030122915"
        },
        {
            type: "name",
            des: "名称",
            data: "测试一下"
        },
        {
            type: "remark",
            des: "备注",
            data: "测试测试测试"
        }
    ],
    positionPoint: [{
            id: 1,
            lon: "114.614796",
            lat: "32.353949",
            height: "-280.07"
        },
        {
            id: 2,
            lon: "114.933205",
            lat: "31.595417",
            height: "-615.08"
        },
        {
            id: 3,
            lon: "116.11673",
            lat: "32.429029",
            height: "-407.07"
        },
        {
            id: 4,
            lon: "116.30435",
            lat: "31.751799",
            height: "44.75"
        },
        {
            id: 5,
            lon: "115.593308",
            lat: "32.744648",
            height: "-565.04"
        }
    ],
    classInfo: [{
            type: "entity_type",
            des: "类型",
            data: "墙体",
        },
        {
            type: "entity_current_height",
            des: "离地高度",
            data: "145.98"
        },
        {
            type: "entity_fill",
            des: "是否填充",
            data: false
        },
        {
            type: "entity_outline",
            des: "是否边框",
            data: true
        },
        {
            type: "entity_closed",
            des: "是否闭合",
            data: false,
        },
        {
            type: "entity_outline",
            des: "是否边框",
            data: false,
        }
    ]
};
/**
 * 动态设置坐标列表中坐标数据
 */
function setPositionPoint() {
    let data = attrData.positionPoint;
    for (let i = 0; i < data.length; i++) {
        attrData.positionPoint[i].address = attrData.positionPoint[i].id;
        $('#position-list').append(`
       <div id="position-list-member` + (data[i].id) + `" style="border-top: 1px solid rgb(255, 255, 255);margin-bottom:10px">
           <div class="position-list-member-title">
               <div onclick="closePosition(` + (data[i].id) + `)" style="cursor: pointer;width:50%;display:inline-block">
                   <span class="iconfont icon-jianhao" style="font-size:12px;margin:0 5px 0 5px"
                       id="hidePositionMember` + (data[i].id) + `"></span>
                   <span class="iconfont icon-jiahao hidden" style="font-size:12px;margin:0 5px 0 5px"
                       id="showPositionMember` + (data[i].id) + `"></span>
                   <span id="position-point-title-` + data[i].id + `">第` + (data[i].id) + `点</span>
               </div>
               <div style="float:right;padding-right:5px">
                   <span class="iconfont icon-21" style="cursor: pointer;font-size:15px;margin-right:3px"
                       onclick="addPositionPoint()"></span>
                   <span class="iconfont icon-ashbin" style="cursor: pointer;font-size:15px"
                       onclick="removePositionPoint(` + (data[i].id) + `)"></span>
               </div>
           </div>
           <div id="position-list-member` + (data[i].id) + `-info">
               <table id="position-point-table-1" border="1" cellspacing="0" cellpadding="0" style="border:solid #fff 1px;width:100%">
                   <tbody>
                       <tr id="position-point-lon-` + (data[i].id) + `" style="height:40px;">
                           <td style="padding-left:5px;width:30%">经度:</td>
                           <td style="padding-left:5px">
                               <input id="position-point-lon-data-` + (data[i].id) + `" type="text" value="` + data[i].lon + `" class="form-control set-html-info-input" />
                           </td>
                       </tr>
                       <tr id="position-point-lat-` + (data[i].id) + `" style="height:40px;">
                           <td style="padding-left:5px;width:30%">纬度:</td>
                           <td style="padding-left:5px">
                               <input id="position-point-lat-data-` + (data[i].id) + `" type="text" value="` + data[i].lat + `" class="form-control set-html-info-input"/>
                           </td>
                       </tr>
                       <tr id="position-point-height-` + (data[i].id) + `" style="height:40px;">
                           <td style="padding-left:5px;width:30%">高度:</td>
                           <td style="padding-left:5px">
                               <input id="position-point-height-data-` + (data[i].id) + `" type="text" value="` + data[i].height + `" class="form-control set-html-info-input"/>
                           </td>
                       </tr>
                   </tbody>
               </table>
           </div>
       </div>
       `);
    }
};

/**
 * 根据选择的集合体，动态添加html数据
 */
function sysncSetHtml() {
    var drawHtml = getDifferentForm(attrData.classInfo);
    for (let i = 0; i < drawHtml.length; i++) {
        $('#classInfoList').append(drawHtml[i]);
    }
}

/**
 * 动态添加标绘页数据
 */
function setHtmlToMainList(type) {
    clearPlottingMainList();
    let data = getSessionData('plotting');
    if (typeof (data) == 'undefined') {
        return false;
    }
    switch (type) {
        case 'pointLabel':
            let pointLabel = data.point_label;
            for (let i = 0; i < pointLabel.length; i++) {
                drawHtmlToMainList(pointLabel[i], type, i);
            }
            break;
        case 'icon':
            let iconList = data.icon_list;
            for (let i = 0; i < iconList.length; i++) {
                drawHtmlToMainList(iconList[i], type, i);
            }
            break;
        case 'smallModel':
            let gltfList = data.gltf_list;
            for (let i = 0; i < gltfList.length; i++) {
                drawHtmlToMainList(gltfList[i], type, i);
            }
            break;
        case '2D':
            let twoList = data.two;
            for (let i = 0; i < twoList.length; i++) {
                drawHtmlToMainList(twoList[i], type, i);
            }
            break;
        case '3D':
            let threeList = data.three;
            for (let i = 0; i < threeList.length; i++) {
                drawHtmlToMainList(threeList[i], type, i);
            }
            break;
        case 'militaryPlotting':
            let militaryList = data.military;
            for (let i = 0; i < militaryList.length; i++) {
                drawHtmlToMainList(militaryList[i], type, i);
            }
            break;
        default:
            break;
    }
}
/**
 * 标绘页html参数绘制实现
 */
function drawHtmlToMainList(data, type, index) {
    switch (type) {
        case 'pointLabel':
            $('#select-draw-list').append(
                `<div class="col-xs-3 sys-draw" id="draw-point-label-` + index + `" onclick="drawOnCesiumGlobeByPointLabel(` + index + `)">
                    <image src="` + data.image_url + `" style="width: 100%;height: 100%;position: absolute;left: 0;"></image>
                </div>`
            );
            break;
        case 'icon':
            $('#select-draw-list').append(
                `<div class="col-xs-3 sys-draw" id="draw-icon-` + index + `" onclick="drawOnCesiumGlobeByIcon(` + index + `)" style="color: #f1f509">
                    <i class="iconfont ` + data.class + `"></i>
                </div>`
            );
            break;
        case 'smallModel':
            $('#select-draw-list').append(
                `<div class="col-xs-3 sys-draw" id="draw-gltf-` + index + `" onclick="drawOnCesiumGlobeByGltf(` + index + `)" title="`+ data.des +`">
                    <image src="` + data.image_url + `" style="width: 100%;height: 100%;position: absolute;left: 0;"></image>
                </div>`
            );
            break;
        case '2D':
            $('#select-draw-list').append(
                `<div class="col-xs-3 sys-draw" id="draw-two-` + index + `" onclick="drawOnCesiumGlobeByTwo(` + index + `)" title="`+ data.des +`">
                    <image src="` + data.image_url + `" style="width: 100%;height: 100%;position: absolute;left: 0;"></image>
                </div>`
            );
            break;
        case '3D':
            $('#select-draw-list').append(
                `<div class="col-xs-3 sys-draw" id="draw-three-` + index + `" onclick="drawOnCesiumGlobeByThree(` + index + `)" title="`+ data.des +`">
                    <image src="` + data.image_url + `" style="width: 100%;height: 100%;position: absolute;left: 0;"></image>
                </div>`
            );
            break;
        case 'militaryPlotting':
            $('#select-draw-list').append(
                `<div class="col-xs-3 sys-draw" id="draw-military-` + index + `" onclick="drawOnCesiumGlobeByMilitary(` + index + `)" title="`+ data.des +`">
                    <image src="` + data.image_url + `" style="width: 100%;height: 100%;position: absolute;left: 0;"></image>
                </div>`
            );
            break;
        default:
            break;
    }
}