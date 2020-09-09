<template>
<el-drawer :title="$store.state.leftSide.title" :modal="false" :visible.sync="$store.state.leftSide.drawer" size="45%" style="outline:0">
    <geometry></geometry>
    <el-drawer style="outline:0" :title="$store.state.leftSide.subTitle" :append-to-body="true" :before-close="handleClose" :visible.sync="$store.state.leftSide.innerDrawer" :modal="false">
        <geometry-add v-if="$store.state.leftSide.type=='geometry'"></geometry-add>
    </el-drawer>
</el-drawer>
</template>

<script>
import geometry from "../geometry/index";
import geometryAdd from "../geometry/form";
export default {
    data() {
        return {
            innerDrawer: false
        };
    },
    methods: {
        setInnerDrawer() {
            this.$store.commit('SET_LEFT_INNERDRAWER', true)
        },
        handleClose() {
            this.$store.commit("SET_LEFT_INNERDRAWER", false);
        }
    },
    components: {
        geometry,
        geometryAdd
    }
};
</script>

<style scoped>
/deep/ :focus {
    outline: 0;
}
</style><style>
.el-drawer.rtl {
    background: rgba(255, 255, 255, 0.8);
}
</style>
