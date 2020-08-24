<template>
  <div id="app">
    <toolbar></toolbar>
    <router-view/>
  </div>
</template>

<script>
import toolbar from '@/views/toolbar/index'
export default {
  components: {
    toolbar
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