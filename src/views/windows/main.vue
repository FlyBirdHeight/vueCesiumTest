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
          <select class="form-control select-form-control" id="select-data">
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

<style>

</style>