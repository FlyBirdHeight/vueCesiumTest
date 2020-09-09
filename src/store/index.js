import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations_type'
import actions from './actions'
import getters from './getters'
import state from './state'
import viewer from "./modules/viewer.js"
import position from "./modules/position.js"
import leftSide from "./modules/leftSide.js"
import rightSide from "./modules/rightSide.js"
import geometryForm from "./modules/geometry_form.js"

Vue.use(Vuex);

export default new Vuex.Store({
  //state相当于组件中的data,专门用来存放全局数据
  state,
  //相当于组件中的computed,但是是全局中使用的
  getters,
  //相当于组件中methods，但是不能使用异步方法（定时器或者axios）,payload是一个形参，组件调用函数的时候传过来的
  mutations,
  //actions专门用来处理异步，实际修改状态值的依然是Mutations
  actions,
  modules: {
    viewer,
    position,
    leftSide,
    rightSide,
    geometryForm
  }
});