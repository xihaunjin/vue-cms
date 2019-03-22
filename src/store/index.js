import Vue from 'vue'
import Vuex from 'vuex'
import staff from './staff/index'

Vue.use(Vuex)
// import login from './login/index'
const store = new Vuex.Store({
  modules: {
    staff
    // login,
  }
})
export default store
