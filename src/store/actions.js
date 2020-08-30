export default {
    increaseAsync(context) { //this.$store.dispatch('increaseAsync')组件中使用
        context.commit('increase')
    }
}