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
            data: "墙体"
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
        }
    ]
};
/**
 * 动态设置坐标列表中坐标数据
 */
function setPositionPoint() {
    let data = attrData.positionPoint;
    console.log(data);
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
                   <span id="position-point-title-`+ data[i].id +`">第` + (data[i].id) + `点</span>
               </div>
               <div style="float:right;padding-right:5px">
                   <span class="iconfont icon-21" style="cursor: pointer;font-size:15px;margin-right:3px"
                       onclick="addPositionPoint()"></span>
                   <span class="iconfont icon-ashbin" style="cursor: pointer;font-size:15px"
                       onclick="removePositionPoint(` + (data[i].id) + `)"></span>
               </div>
           </div>
           <div id="position-list-member` + (data[i].id) + `-info">
               <table id="position-point-table-1" border="1" cellspacing="0" cellpadding="0">
                   <tbody>
                       <tr id="position-point-lon-` + (data[i].id) + `" style="height:40px;">
                           <td style="padding-left:5px;width:30%">经度:</td>
                           <td style="padding-left:5px">
                               <input id="position-point-lon-data-` + (data[i].id) + `" type="text" value="` + data[i].lon + `" class="form-control"
                                   style="margin:10px;width:80%;height:28px" />
                           </td>
                       </tr>
                       <tr id="position-point-lat-` + (data[i].id) + `" style="height:40px;">
                           <td style="padding-left:5px;width:30%">纬度:</td>
                           <td style="padding-left:5px">
                               <input id="position-point-lat-data-` + (data[i].id) + `" type="text" value="` + data[i].lat + `" class="form-control"
                                   style="margin:10px;width:80%;height:28px" />
                           </td>
                       </tr>
                       <tr id="position-point-height-` + (data[i].id) + `" style="height:40px;">
                           <td style="padding-left:5px;width:30%">高度:</td>
                           <td style="padding-left:5px">
                               <input id="position-point-height-data-` + (data[i].id) + `" type="text" value="` + data[i].height + `" class="form-control"
                                   style="margin:10px;width:80%;height:28px" />
                           </td>
                       </tr>
                   </tbody>
               </table>
           </div>
       </div>
       `);
    }
};