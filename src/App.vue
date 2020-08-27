<template>
  <div id="app">
    <toolbar></toolbar>
    <router-view/>
    <left-side></left-side>
    <right-side></right-side>
  </div>
</template>

<script>
import toolbar from '@/views/toolbar/index'
import LeftSide from '@/views/toolbar/LeftSide'
import RightSide from '@/views/toolbar/RightSide'
export default {
  components: {
    toolbar,
    LeftSide,
    RightSide
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