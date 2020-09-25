<template>
  <div>
    <el-form ref="polyline" size="mini" :model="polyline" :label-position="'top'">
      <el-form-item label="宽度">
        <el-input-number v-model="polyline.outlineWidth" :precision="1" :step="10"></el-input-number>
      </el-form-item>
      <el-form-item label="颜色设置">
        <el-color-picker v-model="polyline.material_color" show-alpha :predefine="predefineColors"></el-color-picker>
      </el-form-item>
      <el-form-item label="是否启用虚线">
        <el-radio v-model="polyline.dash" :label="true" border>是</el-radio>
        <el-radio v-model="polyline.dash" :label="false" border>否</el-radio>
      </el-form-item>
      <el-form-item label="虚线间隔" v-if="polyline.dash">
        <el-input-number v-model="polyline.dashLength" :precision="1" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="虚线间隔颜色" v-if="polyline.dash">
        <el-color-picker v-model="polyline.gapColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="是否在地面固定">
        <el-radio v-model="polyline.clampToGround" :label="true" border>是</el-radio>
        <el-radio v-model="polyline.clampToGround" :label="false" border>否</el-radio>
      </el-form-item>
      <el-form-item label="弧形方式">
        <el-select v-model="polyline.arctype" placeholder="请选择">
          <el-option v-for="arc in arcTypeSelect" :key="arc.value" :label="arc.label" :value="arc.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阴影设置">
        <el-select v-model="polyline.shadows" placeholder="请选择">
          <el-option v-for="sh in shadowsSelect" :key="sh.value" :label="sh.label" :value="sh.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地形及模型附着">
        <el-select v-model="polyline.classificationType" placeholder="请选择">
          <el-option
            v-for="classif in classificationTypeSelect"
            :key="classif.value"
            :label="classif.label"
            :value="classif.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示轮廓">
        <el-radio v-model="polyline.outline" :label="true" border>显示</el-radio>
        <el-radio v-model="polyline.outline" :label="false" border>不显示</el-radio>
      </el-form-item>
      <el-form-item label="轮廓颜色" v-if="polyline.outline">
        <el-color-picker v-model="polyline.outlineColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="轮廓宽度" v-if="polyline.outline">
        <el-input-number v-model="polyline.outlineWidth" :precision="1" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="动态绘制">
        <el-button icon="el-icon-circle-plus" type="success" size="mini" @click="drawPolyline"
          >点击开始动态绘制</el-button
        >
        <el-tooltip class="item" effect="dark" content="动态绘制使用规则(点击查看)" placement="top-start">
          <el-button icon="el-icon-warning-outline" size="mini" type="info" circle @click="seeInfo"></el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <polyline-dialog :show.sync="show"></polyline-dialog>
  </div>
</template>

<script>
import config from '@/data/geometry_config.json'
import polylineDialog from '@/components/dialog/geometry/polylineDraw'
export default {
  props: {
    polyline: {
      type: Object,
      default: {},
    },
    submitForm: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      arcTypeSelect: config.polyline.arcTypeSelect,
      classificationTypeSelect: config.polyline.classificationTypeSelect,
      shadowsSelect: config.polyline.shadowsSelect,
      predefineColors: config.color,
      show: false,
    }
  },
  methods: {
    handleData() {
      this.$emit('polyline', this.polyline)
    },
    drawPolyline() {
      let _this = this
      this.$store.commit('SET_LEFT_INNERDRAWER', false)
      this.$store.commit('SET_LEFT_DRAWER', false)
      this.$store.commit('SET_DYNAMIC', true)
      this.$store.commit('SET_DRAW_TYPE', 'polyline')
      this.form.id = 'polyline:' + new Date().getTime()
      this.form.polyline = this.polyline
      this.$store.commit('SET_DRAW_STYLE', {
        data: _this.form,
      })
      this.$notify({
        title: '绘制折线段',
        message: '请在地图中动态绘制折线段',
        type: 'info',
        offset: 60,
      })
    },
    seeInfo() {
      this.show = true
    },
  },
  components: {
    polylineDialog,
  },
}
</script>

<style></style>
