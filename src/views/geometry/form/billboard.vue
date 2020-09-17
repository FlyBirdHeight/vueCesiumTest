<template>
  <el-form ref="billboard" size="mini" :model="billboard" :label-position="'top'">
    <el-form-item label="上传图片">
      <el-upload
        class="avatar-uploader"
        action="/api/v1/upload/image"
        :show-file-list="false"
        name="image"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        :on-success="handleSuccess"
      >
        <img v-if="billboard.image" :src="billboard.image" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height:3"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="颜色选择">
      <el-color-picker v-model="billboard.color" show-alpha :predefine="predefineColors"></el-color-picker>
    </el-form-item>
    <el-form-item label="缩放比例">
      <el-input-number
        v-model="billboard.scale"
        :precision="1"
        controls-position="right"
        :step="0.5"
        :min="0.5"
        :max="2.0"
        step-strictly
      ></el-input-number>
    </el-form-item>
    <el-form-item label="水平线显示方位">
      <el-select v-model="billboard.horizontalOrigin" clearable placeholder="请选择">
        <el-option v-for="item in horizontal" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="重叠时显示偏移(二维坐标系下)">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="billboard.pixelOffset.x" placeholder="x轴偏移"></el-input>
        </el-col>
        <el-col :span="12">
          <el-input v-model="billboard.pixelOffset.y" placeholder="y轴偏移"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="锚点位置">
      <el-select v-model="billboard.verticalOrigin" clearable placeholder="请选择">
        <el-option v-for="item in vertical" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
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
    billboard: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      predefineColors: config.billboard.color,
      horizontal: config.billboard.horizontalOrigin,
      vertical: config.billboard.verticalOrigin,
    }
  },
  methods: {
    handleSuccess(res, file) {
      this.billboard.image = res.response
    },
    handleData() {
      this.$emit('billboard', this.billboard)
    },
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

<style>
.el-form--label-top .el-form-item__label {
  padding: 0px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}

.avatar {
  width: 90px;
  height: 90px;
  display: block;
}
</style>
