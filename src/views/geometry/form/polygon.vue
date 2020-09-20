<template>
  <el-form ref="polygon" size="mini" :model="polygon" :label-position="'top'">
    <el-form-item label="是否填充">
      <el-radio v-model="polygon.fill" :label="true" border>填充</el-radio>
      <el-radio v-model="polygon.fill" :label="false" border>不填充</el-radio>
    </el-form-item>
    <el-form-item label="材质设置">
      <el-color-picker v-model="polygon.material" show-alpha :predefine="predefineColors"></el-color-picker>
    </el-form-item>
    <el-form-item label="高度(若设置高度，则是几何体)" class="clearBottom">
      <el-input-number v-model="polygon.extrudedHeight" :precision="4" :step="100"></el-input-number>
    </el-form-item>
    <el-form-item label="是否显示轮廓">
      <el-radio v-model="polygon.outline" :label="true" border>显示</el-radio>
      <el-radio v-model="polygon.outline" :label="false" border>不显示</el-radio>
    </el-form-item>
    <el-form-item label="轮廓颜色" v-if="polygon.outline">
      <el-color-picker v-model="polygon.outlineColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="轮廓宽度" v-if="polygon.outline">
      <el-input-number v-model="polygon.outlineWidth" :precision="1" :step="1"></el-input-number>
    </el-form-item>
    <el-form-item label="动态绘制">
      <el-button
        icon="el-icon-circle-plus"
        type="success"
        size="mini"
        @click="drawPolygon"
        >点击开始动态绘制</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import config from '@/data/geometry_config.json'
export default {
  props: {
    submitForm: {
      type: Boolean,
      default: false,
    },
    polygon: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      predefineColors: config.color
    }
  },
  methods: {
    handleData() {
      this.$emit('polygon', this.polygon)
    },
    drawPolygon(){
        
    }
  },
  watch: {
    submitForm: {
      immediate: true,
      handler: function(newV, oldV) {
        if (newV) {
          this.handleData()
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.clearBottom {
  margin-bottom: 0px;
}
</style>
