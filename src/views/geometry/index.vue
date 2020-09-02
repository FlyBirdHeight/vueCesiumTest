<template>
<div>
    <div style="margin-left:10px">
        <el-button type="primary" size="small" icon="el-icon-edit" @click="setButton">{{ $store.state.leftSide.subTitle }}</el-button>
        <el-button type="success" size="small" icon="el-icon-zoom-in" @click="flyToGeometry">跳转选中几何体</el-button>
    </div>
    <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%;margin-top:10px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column label="创建时间" width="120">
            <template slot-scope="scope">
                <span style="font-size:10px">{{ scope.row.date }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="120"></el-table-column>
        <el-table-column prop="coordinates" label="经纬度坐标" width="120"></el-table-column>
        <el-table-column prop="length" label="长度"></el-table-column>
        <el-table-column prop="width" label="宽度"></el-table-column>
        <el-table-column prop="height" label="高度"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
    props: {
        innerDrawer: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            tableData: [{
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                }
            ]
        };
    },
    methods: {
        setButton() {
            this.$emit('innerDrawer', new Boolean(true));
        },
        handleClose() {
            this.innerDrawer = false;
        },
        flyToGeometry() {
            console.log();
        },
        handleSelectionChange(val) {
            console.log(val);
        },
        handleClick(row) {}
    }
};
</script>

<style>
</style>
