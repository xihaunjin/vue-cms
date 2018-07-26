import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import staff from './staff/index'
// import login from './login/index'
const store = new Vuex.Store({
	modules: {
		staff
		// login,
	}
})
export default store