import Vue from 'vue'
import Vuex from 'vuex'
import API from './API'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		User: {
			isLogged: false,
			session: {}
		},
		authRequired: false,
		loading: false
	},
	getters: {
		User: s => s.User,
		drawRouter: s => s.authRequired ? s.User.isLogged : true,
		loading: s => s.loading
	},
	mutations: {
		authRequired (s, val) { s.authRequired = val },
		loading (s, val) { s.loading = !!val },

		async checkSession (s) {
			s.loading = true
			const result = await API.auth.session()
			if (result.msg) {
				s.User.isLogged = true
				s.User.session = result.msg
			}
			s.loading = false
		},

		async logout (s) {
			s.loading = true
			const result = await API.auth.logout()
			if (result.msg === 'success') {
				s.User.isLogged = false
				s.User.session = {}
			} else {
				alert('Произошла непредвиденная ошибка')
			}
			s.loading = false
		}
	},
	actions: {

	}
})

export default store
