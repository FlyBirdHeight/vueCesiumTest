<template>
  <div class="windows" id="main-windows">
    <div class="title">
      <span class="title-set">标绘(含属性编辑)</span>
    </div>
    <div class="operation">
      <div class="col-xs-2 operation-list-member" id="openFile">
        <i class="iconfont icon-file-add operation-list-member-icon"></i>
        <span class="tooltiptext">打开文件</span>
      </div>
      <div class="col-xs-2 operation-list-member" id="addFile">
        <i class="iconfont icon-file-open operation-list-member-icon"></i>
        <span class="tooltiptext">添加文件</span>
      </div>
      <div class="col-xs-2 operation-list-member" id="saveFile">
        <i class="iconfont icon-save operation-list-member-icon"></i>
        <span class="tooltiptext">保存文件</span>
      </div>
      <div class="col-xs-2 operation-list-member" id="clearPlot">
        <i class="iconfont icon-ashbin operation-list-member-icon"></i>
        <span class="tooltiptext">清空标绘</span>
      </div>
      <div class="col-xs-2 operation-list-member" id="setLock">
        <i class="iconfont icon-unlock operation-list-member-icon"></i>
        <i class="iconfont icon-lock operation-list-member-icon hidden"></i>
        <span class="tooltiptext">是否可编辑</span>
      </div>
      <div class="col-xs-2 operation-list-member" id="setPop">
        <i class="iconfont icon-file operation-list-member-icon"></i>
        <span class="tooltiptext">启用Popup窗口</span>
      </div>
    </div>
    <div class="toolbar">
      <div class="toolbar-first" id="addPlot">
        <div class="select">
          <select class="form-control" id="select-data">
            <option value="pointLabel">点及文字</option>
            <option value="icon">字体点</option>
            <option value="smallModel">小模型</option>
            <option value="2D">二维平面类</option>
            <option value="3D">三维立体类</option>
            <option value="militaryPlotting">军事标绘</option>
          </select>
        </div>
        <div class="select_list">
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
          <div class="col-xs-3 sys-draw">
            <i class="iconfont icon-navigation"></i>
          </div>
        </div>
      </div>
      <div class="toolbar_second hidden" id="fileList">
        <div class="file-tree"></div>
      </div>
    </div>
    <div class="bottom">
      <ul style="margin:0;padding:0;list-style:none">
        <li
          style="margin-left:10px"
          id="setPlot"
          class="active bottom-list-li"
          @click="setActive('nav')"
        >
          标号
        </li>
        <li class="bottom-list-li" id="setList" @click="setActive('list')">
          列表
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    selectDraw() {
      console.log("drag");
    },
    setActive(type) {
      switch (type) {
        case "nav":
          $("#setList").removeClass("active");
          $("#setPlot").addClass("active");
          $("#fileList").addClass("hidden");
          $("#addPlot").removeClass("hidden");
          break;
        case "list":
          $("#setPlot").removeClass("active");
          $("#setList").addClass("active");
          $("#addPlot").addClass("hidden");
          $("#fileList").removeClass("hidden");
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.windows {
  height: 70%;
  border: 1px solid rgba(32, 160, 255, 0.6);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  width: 20%;
  z-index: 1000;
  position: absolute;
  right: 60px;
  top: 15%;
}
.windows .title {
  height: 40px;
  text-align: left;
  line-height: 40px;
  width: 100%;
  border-bottom: 1px solid rgba(32, 160, 255, 0.3);
}
.windows .title .title-set {
  font-weight: bolder;
  padding-left: 10px;
  font-size: 15px;
  font-family: Microsoft YaHei;
}
.windows .operation {
  height: 38px;
  line-height: 38px;
  width: 100%;
  border-bottom: #dedede 1px solid;
}
.windows .operation .operation-list {
  list-style: none;
}
.windows .operation .operation-list-member {
  height: 38px;
  cursor: pointer;
  text-align: center;
}
.windows .operation .operation-list-member .tooltiptext {
  visibility: hidden;
  width: 90px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size:10px;
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
.windows .operation .operation-list-member:hover .tooltiptext {
    visibility: visible;
}
.windows .operation .operation-list-member .operation-list-member-icon {
  color: #fff;
  line-height: 38px;
  font-size: 20px;
  text-align: center;
}
.hidden {
  display: none;
}
.windows .toolbar {
  height: calc(100% - 78px);
  width: 100%;
}
.windows .toolbar .toolbar-first {
  height: calc(100% - 30px);
  width: 100%;
  overflow-y: auto;
}
.windows .toolbar .toolbar-first .select {
  margin: 10px 15px 0px 15px;
}
.windows .toolbar .toolbar-first .select_list .sys-draw {
  height: 60px;
  border: 1px solid #fff;
  margin: 4%;
  text-align: center;
  line-height: 60px;
  background-color: rgba(63, 72, 84, 0.6);
  font-size: 1em;
}
.col-xs-2,
.col-xs-3 {
  padding-left: 6px;
  padding-right: 6px;
}
.windows .bottom {
  height: 30px;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.windows .bottom ul {
  background-color: rgba(63, 72, 84, 0.6);
  border-top: 1px solid #ddd;
  height: 30px;
}
.windows .bottom .bottom-list-li {
  display: inline-block;
  width: 55px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  color: grey;
  box-sizing: border-box;
  cursor: pointer;
}
.windows .bottom .active {
  color: #fff;
  background-color: rgba(63, 72, 84, 0.6);
  border: 1px solid #ddd;
  border-radius: 0 0 6px 6px;
  font-weight: bolder;
  margin-top: -1px;
}

.windows .toolbar .toolbar-first::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.windows .toolbar .toolbar-first::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  background-color: rgb(97, 93, 93);
}

.windows .toolbar .toolbar-first::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
}
</style>