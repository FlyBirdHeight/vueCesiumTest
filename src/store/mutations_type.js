export const MUTATIONS_TYPE = {
    INCREASE: 'increase'
}

export default {
    [MUTATIONS_TYPE.INCREASE](state, payload) { //this.$store.commit(MUTATIONS_TYPE.INCREASE)组件中使用
        state.num += payload ? payload : 1;
    }
}

//还有一种使用方法如下：
// import {mapGetters,mapMutations} from 'vuex'F
// import {MUTATIONS_TYPE} from '@/store/mutations_type.js'
// ...mapMutations([MUTATIONS_TYPE.INCREASE])