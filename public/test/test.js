`
<div id="position-list-member` + i + `" style="border-top: 1px solid rgb(255, 255, 255);">
    <div class="position-list-member-title">
        <div @click="closePosition(` + i + `)" style="cursor: pointer;width:50%;display:inline-block">
            <span class="iconfont icon-jianhao" style="font-size:12px;margin:0 5px 0 5px"
                id="hidePositionMember` + i + `"></span>
            <span class="iconfont icon-jiahao hidden" style="font-size:12px;margin:0 5px 0 5px"
                id="showPositionMember` + i + `"></span>
            <span>第` + i + `点</span>
        </div>
        <div style="float:right;padding-right:5px">
            <span class="iconfont icon-21" style="cursor: pointer;font-size:15px;margin-right:3px"
                @click="addPositionPoint"></span>
            <span class="iconfont icon-ashbin" style="cursor: pointer;font-size:15px"
                @click="removePositionPoint(` + i + `)"></span>
        </div>
    </div>
    <div id="position-list-member` + i + `-info">
        <table id="position-point-table-1" border="1" cellspacing="0" cellpadding="0">
            <tbody>
                <tr id="position-point-lon-` + i + `" style="height:40px;">
                    <td style="padding-left:5px;width:30%">经度:</td>
                    <td style="padding-left:5px">
                        <input id="position-point-lon-data-` + i + `" type="text" value="`+ data[i].lon +`" class="form-control"
                            style="margin:10px;width:80%;height:28px" />
                    </td>
                </tr>
                <tr id="position-point-lat-` + i + `" style="height:40px;">
                    <td style="padding-left:5px;width:30%">纬度:</td>
                    <td style="padding-left:5px">
                        <input id="position-point-lat-data-` + i + `" type="text" value="`+ data[i].lat +`" class="form-control"
                            style="margin:10px;width:80%;height:28px" />
                    </td>
                </tr>
                <tr id="position-point-height-` + i + `" style="height:40px;">
                    <td style="padding-left:5px;width:30%">高度:</td>
                    <td style="padding-left:5px">
                        <input id="position-point-height-data-` + i + `" type="text" value="`+ data[i].height +`" class="form-control"
                            style="margin:10px;width:80%;height:28px" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`