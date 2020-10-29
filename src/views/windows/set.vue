<template>
  <div class="navDataSet" id="navDataSet">
    <div class="title">
      <span class="title-set">属性编辑</span>
      <span class="iconfont icon-close closeIcon" @click="closeSetting"></span>
    </div>
    <div class="operation">
      <div class="col-xs-2 operation-list-member" id="openFile">
        <i class="iconfont icon-navigation  operation-list-member-icon"></i>
        <span class="tooltiptext">定位</span>
      </div>
      <div class="col-xs-2 operation-list-member" id="deletePlot">
        <i class="iconfont icon-file-open operation-list-member-icon"></i>
        <span class="tooltiptext">删除</span>
      </div>
      <div class="col-xs-2 operation-list-member" id="saveFileInSet">
        <i class="iconfont icon-save operation-list-member-icon"></i>
        <span class="tooltiptext">保存文件</span>
      </div>
    </div>
    <div class="toolbar">
      <div class="toolbar-first" id="styleSet">
        <div class="style">
          <div class="style-title" @click="showStyle()">
            <span
              class="iconfont icon-jianhao"
              style="font-size:12px;margin:0 5px 0 5px"
              id="hideStyle"
            ></span>
            <span
              class="iconfont icon-jiahao hidden"
              style="font-size:12px;margin:0 5px 0 5px"
              id="showStyle"
            ></span>
            <span>属性信息</span>
          </div>
          <div class="style-info">
            <table id="style-table" border="1" cellspacing="0" cellpadding="0">
              <tbody>
                <tr id="plot_style_id" style="height:30px;">
                  <td style="padding-left:10px;width:30%">主键</td>
                  <td style="padding-left:10px">20201019123836</td>
                </tr>
                <tr
                  id="plot_style_tr_name"
                  style="height:60px;line-height:60px"
                >
                  <td style="padding-left:10px;width:30%">名称</td>
                  <td style="padding-left:10px">
                    <input
                      id="plot_style_name"
                      type="text"
                      value=""
                      class="form-control"
                      style="margin:10px;width:80%"
                    />
                  </td>
                </tr>
                <tr
                  id="plot_style_tr_remark"
                  style="height:90px;line-height:90px"
                >
                  <td style="padding-left:10px;width:30%">备注</td>
                  <td style="padding-left:10px">
                    <textarea
                      id="plot_style_remark"
                      class="form-control"
                      style="height:60px;resize: none;margin:10px;width:80%"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="toolbar-second hidden" id="positionSet" style="height:100%">
        <div class="position" style="height:100%">
          <div class="position-title" @click="showPosition()">
            <span
              class="iconfont icon-jianhao"
              style="font-size:12px;margin:0 5px 0 5px"
              id="hidePositionAll"
            ></span>
            <span
              class="iconfont icon-jiahao hidden"
              style="font-size:12px;margin:0 5px 0 5px"
              id="showPositionAll"
            ></span>
            <span>坐标列表</span>
          </div>
          <div class="position-list" id="position-list">
            <div id="position-list-member1">
              <div class="position-list-member-title">
                <div class="position-list-member-sub-title">
                  <span
                    class="iconfont icon-jianhao"
                    style="font-size:12px;margin:0 5px 0 5px"
                    id="hidePositionMember1"
                  ></span>
                  <span
                    class="iconfont icon-jiahao hidden"
                    style="font-size:12px;margin:0 5px 0 5px"
                    id="showPositionMember1"
                  ></span>
                  <span>第1点</span>
                  <span class="iconfont icon-circle-jiahao"></span>
                  <span class="iconfont icon-lajitong"></span>
                </div>
              </div>
              <div class="position-list-member-data">

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="toolbar-third hidden" id="classSet">
        <div class="class"></div>
      </div>
    </div>
    <div class="bottom">
      <ul style="margin:0;padding:0;list-style:none">
        <li
          style="margin-left:10px"
          id="setStyle"
          class="active bottom-list-li"
          @click="setActive('style')"
        >
          属性
        </li>
        <li
          class="bottom-list-li"
          id="setPosition"
          @click="setActive('position')"
        >
          坐标
        </li>
        <li class="bottom-list-li" id="setClass" @click="setActive('class')">
          样式
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * 坐标页，控制展示全部坐标点
     */
    showPosition() {},
    /**
     * 属性页，展示和收起属性列表
     */
    showStyle() {
      if ($("#hideStyle").hasClass("hidden")) {
        $("#hideStyle").removeClass("hidden");
        $("#showStyle").addClass("hidden");
        $("#style-table").removeClass("hidden");
      } else {
        $("#hideStyle").addClass("hidden");
        $("#showStyle").removeClass("hidden");
        $("#style-table").addClass("hidden");
      }
    },
    /**
     * 关闭设置页面
     */
    closeSetting() {
      $("#navDataSet").addClass("hidden");
    },
    /**
     * 设置显示页面
     */
    setActive(type) {
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
    },
    resetActive() {
      $("#setStyle").removeClass("active");
      $("#setPosition").removeClass("active");
      $("#setClass").removeClass("active");
      $("#styleSet").addClass("hidden");
      $("#positionSet").addClass("hidden");
      $("#classSet").addClass("hidden");
    }
  }
};
</script>

<style scoped>
/**
* 关闭icon的样式
*/
.navDataSet .title .closeIcon {
  float: right;
  padding-right: 10px;
  color: #fff;
}
/**
* 鼠标移动到x上的时候改变颜色
*/
.navDataSet .title .closeIcon:hover {
  color: rgba(255, 255, 255, 0.5);
}
.hidden {
  display: none;
}
/**
* 主体样式
*/
.navDataSet {
  height: 70%;
  border: 1px solid rgba(32, 160, 255, 0.6);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  width: 20%;
  z-index: 1000;
  position: absolute;
  left: 50px;
  top: 15%;
}
/**
* 标题样式
*/
.navDataSet .title {
  height: 40px;
  text-align: left;
  line-height: 40px;
  width: 100%;
  border-bottom: 1px solid rgba(32, 160, 255, 0.3);
}
.navDataSet .title .title-set {
  font-weight: bolder;
  padding-left: 10px;
  font-size: 15px;
  font-family: Microsoft YaHei;
}
.col-xs-2,
.col-xs-3 {
  padding-left: 6px;
  padding-right: 6px;
}
/**
* 操作栏样式
*/
.navDataSet .operation {
  height: 38px;
  line-height: 38px;
  width: 100%;
  border-bottom: #dedede 1px solid;
}
.navDataSet .operation .operation-list-member {
  height: 38px;
  cursor: pointer;
  text-align: center;
}
.navDataSet .operation .operation-list-member .tooltiptext {
  visibility: hidden;
  width: 90px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
  height: 25px;
  line-height: 25px;
  color: black;
  text-align: center;
  border-radius: 3px;
  position: absolute;
  z-index: 999;
  top: -50%;
  left: 60%;
}
.navDataSet .operation .operation-list-member:hover .tooltiptext {
  visibility: visible;
}
.navDataSet .operation .operation-list-member .operation-list-member-icon {
  color: #fff;
  line-height: 38px;
  font-size: 20px;
  text-align: center;
}
/**
* 数据操作框样式
*/
.navDataSet .toolbar {
  height: calc(100% - 108px);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
/**
* 属性页，标题样式
*/
.navDataSet .toolbar .toolbar-first .style .style-title {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background: #1c3b3a;
  cursor: pointer;
}
/**
* 表格样式
*/
.navDataSet .toolbar .toolbar-first .style .style-info table {
  width: 100%;
  border: 0;
  font-size: 12px;
}
/**
* 坐标页，标题样式
*/
.navDataSet .toolbar .toolbar-second .position .position-title {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background: #1c3b3a;
  cursor: pointer;
}
/**
* 坐标页，最外层列表样式
*/
.navDataSet .toolbar .toolbar-second .position .position-list {
  width: 100%;
  height: calc(100% - 35px);
  padding-left: 15px;
  padding-right: 15px;
  overflow-y: auto;
}
/**
* 坐标页，列表内层样式
*/
.navDataSet
  .toolbar
  .toolbar-second
  .position
  .position-list
  .position-list-member-title {
  background: #1c3b3a;
  height: 25px;
}
/**
* 底部样式
*/
.navDataSet .bottom {
  height: 30px;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.navDataSet .bottom ul {
  background-color: rgba(63, 72, 84, 0.6);
  border-top: 1px solid #ddd;
  height: 30px;
}
.navDataSet .bottom .bottom-list-li {
  display: inline-block;
  width: 55px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  color: grey;
  box-sizing: border-box;
  cursor: pointer;
}
.navDataSet .bottom .active {
  color: #fff;
  background-color: rgba(63, 72, 84, 0.6);
  border: 1px solid #ddd;
  border-radius: 0 0 6px 6px;
  font-weight: bolder;
  margin-top: -1px;
}
</style>