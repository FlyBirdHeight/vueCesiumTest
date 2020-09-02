<template>
<el-drawer :title="$store.state.leftSide.title" direction="ltr" :modal="false" :visible.sync="$store.state.leftSide.drawer" size="45%">
    <geometry @innerDrawer="setInnerDrawer"></geometry>
    <el-drawer :title="$store.state.leftSide.subTitle" :append-to-body="true" :before-close="handleClose" :visible.sync="innerDrawer">
        <p>_(:зゝ∠)_</p>
    </el-drawer>
</el-drawer>
</template>

<script>
import geometry from "../geometry/index";
export default {
    data() {
        return {
            innerDrawer: false
        };
    },
    methods: {
        setInnerDrawer() {
            this.innerDrawer = true;
        },
        handleClose() {
            this.innerDrawer = false;
        }
    },
    components: {
        geometry
    }
};
</script>

<style>
.el-drawer.rtl {
    background: rgba(255, 255, 255, 0.8);
}
</style>
