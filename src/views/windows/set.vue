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
      <div class="toolbar-first hidden" id="styleSet">
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
                      class="form-control set-html-info-input"
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
                      class="form-control set-html-info-textarea"
                      style="height:60px;resize: none;"
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
          <div class="position-list" id="position-list"></div>
        </div>
      </div>
      <div class="toolbar-third" id="classSet" style="height:100%">
        <div class="class-title" @click="showClassInfo()">
          <span
            class="iconfont icon-jianhao"
            style="font-size:12px;margin:0 5px 0 5px"
            id="hideClassInfoAll"
          ></span>
          <span
            class="iconfont icon-jiahao hidden"
            style="font-size:12px;margin:0 5px 0 5px"
            id="showClassInfoAll"
          ></span>
          <span>样式信息</span>
        </div>
        <div class="class-list" id="class-info-list">
          <table
            id="class-info-table"
            border="1"
            cellspacing="0"
            cellpadding="0"
            style="border:solid #fff 1px;width:100%"
          >
            <tbody id="classInfoList">
              <tr id="type" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">类型:</td>
                <td style="padding-left:5px">
                  <span style="font-size:13px;font-weight:bolder">墙体</span>
                </td>
              </tr>
              <tr id="current_height" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">墙高:</td>
                <td style="padding-left:5px">
                  <input
                    id="class_info_entity_current_height"
                    type="number"
                    value="50"
                    class="form-control set-html-info-input"
                  />
                </td>
              </tr>
              <tr id="fill" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">
                  是否填充:
                </td>
                <td style="padding-left:5px">
                  <label class="radio-inline">
                    <input
                      type="radio"
                      name="entity-fill"
                      id="class_info_fill_true"
                      value="true"
                      checked
                    />
                    是
                  </label>
                  <label class="radio-inline">
                    <input
                      type="radio"
                      name="entity-fill"
                      id="class_info_fill_false"
                      value="false"
                    />
                    否
                  </label>
                </td>
              </tr>
              <tr id="fill_type" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">
                  填充类型:
                </td>
                <td style="padding-left:5px">
                  <select
                    class="form-control set-html-info-select"
                    id="class_info_fill_type"
                  >
                    <option value="color">纯色</option>
                    <option value="carton">动画</option>
                    <option value="mesh">网格</option>
                    <option value="2D">条纹</option>
                    <option value="3D">棋盘</option>
                  </select>
                </td>
              </tr>
              <tr id="color" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">
                  颜色:
                </td>
                <td style="padding-left:5px">
                  <input
                    id="class_info_color"
                    type="color"
                    value="50"
                    class="form-control set-html-info-input"
                  />
                </td>
              </tr>
              <tr id="closed" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">
                  是否闭合:
                </td>
                <td style="padding-left:5px">
                  <label class="radio-inline">
                    <input
                      type="radio"
                      name="entity-closed"
                      id="class_info_closed_true"
                      value="true"
                    />
                    是
                  </label>
                  <label class="radio-inline">
                    <input
                      type="radio"
                      name="entity-closed"
                      id="class_info_closed_false"
                      value="false"
                      checked
                    />
                    否
                  </label>
                </td>
              </tr>
              <tr id="outline" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">
                  是否边框:
                </td>
                <td style="padding-left:5px">
                  <label class="radio-inline">
                    <input
                      type="radio"
                      name="entity-outline"
                      id="class_info_outline_true"
                      value="true"
                      checked
                    />
                    是
                  </label>
                  <label class="radio-inline">
                    <input
                      type="radio"
                      name="entity-outline"
                      id="class_info_outline_false"
                      value="false"
                    />
                    否
                  </label>
                </td>
              </tr>
              <tr id="alpha" style="height:40px">
                <td style="padding-left:5px;width:40%;font-size:12px">
                  透明度:
                </td>
                <td style="padding-left:5px">
                  <div id="progress-alpha">
                    <div id="progress-bg-alpha">
                      <div id="progress-bar-alpha"></div>
                    </div>
                    <div id="progress-btn-alpha"></div>
                    <div id="text-alpha">0%</div>
                  </div>
                </td>
              </tr>
              <tr id="color" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">
                  边框颜色:
                </td>
                <td style="padding-left:5px">
                  <input
                    id="class_info_color"
                    type="color"
                    value="50"
                    class="form-control set-html-info-input"
                  />
                </td>
              </tr>
              <tr id="sight_distance" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">
                  是否按视距显示:
                </td>
                <td style="padding-left:5px">
                  <label class="radio-inline">
                    <input
                      type="radio"
                      name="entity-sight_distance"
                      id="class_info_sight_distance_true"
                      value="true"
                    />
                    是
                  </label>
                  <label class="radio-inline">
                    <input
                      type="radio"
                      name="entity-sight_distance"
                      id="class_info_sight_distance_false"
                      value="false"
                      checked
                    />
                    否
                  </label>
                </td>
              </tr>
              <tr id="sight_max_distance" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">
                  最大距离:
                </td>
                <td style="padding-left:5px">
                  <input
                    id="class_info_entity_sight_max_distance"
                    type="number"
                    value="100000"
                    class="form-control set-html-info-input"
                  />
                </td>
              </tr>
              <tr id="sight_min_distance" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">
                  最小距离:
                </td>
                <td style="padding-left:5px">
                  <input
                    id="class_info_entity_sight_min_distance"
                    type="number"
                    value="0"
                    class="form-control set-html-info-input"
                  />
                </td>
              </tr>
              <tr id="shadow" style="height:40px;">
                <td style="padding-left:5px;width:40%;font-size:12px">
                  是否阴影:
                </td>
                <td style="padding-left:5px">
                  <label class="radio-inline">
                    <input
                      type="radio"
                      name="entity-shadow"
                      id="class_info_shadow_true"
                      value="true"
                    />
                    是
                  </label>
                  <label class="radio-inline">
                    <input
                      type="radio"
                      name="entity-shadow"
                      id="class_info_shadow_false"
                      value="false"
                      checked
                    />
                    否
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="bottom">
      <ul style="margin:0;padding:0;list-style:none">
        <li
          style="margin-left:10px"
          id="setStyle"
          class="bottom-list-li"
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
        <li
          class="bottom-list-li active"
          id="setClass"
          @click="setActive('class')"
        >
          样式
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    setPositionPoint();
  },
  methods: {
    /**
     * 样式页，控制展示样式信息
     */
    showClassInfo() {
      if ($("#class-info-list").hasClass("hidden")) {
        $("#class-info-list").removeClass("hidden");
        $("#showClassInfoAll").addClass("hidden");
        $("#hideClassInfoAll").removeClass("hidden");
      } else {
        $("#class-info-list").addClass("hidden");
        $("#hideClassInfoAll").addClass("hidden");
        $("#showClassInfoAll").removeClass("hidden");
      }
    },
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