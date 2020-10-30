<template>
  <div id="app">
    <!-- <toolbar></toolbar>
    <left-side></left-side>
    <right-side></right-side> -->
    <main-windows></main-windows>
    <set-windows></set-windows>
    <router-view/>
  </div>
</template>

<script>
import toolbar from '@/views/toolbar/index'
import LeftSide from '@/views/toolbar/LeftSide'
import RightSide from '@/views/toolbar/RightSide'
import MainWindows from '@/views/windows/main.vue'
import SetWindows from '@/views/windows/set.vue'
export default {
  components: {
    toolbar,
    LeftSide,
    RightSide,
    MainWindows,
    SetWindows
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  color: #000;
  overflow: hidden;
}
</style>