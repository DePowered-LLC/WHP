import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import E404 from '@/views/E404.vue'
import store from './store'

Vue.use(Router)
const router = new Router({
	mode: 'history',
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'main',
			component: Main
		},
		{
			path: '/auth/register',
			name: 'auth-register',
			component: Register
		},
		{
			path: '/auth/login',
			name: 'auth-login',
			component: Login
		},
		{
			path: '*',
			component: E404
		}
	]
})

router.beforeEach((to, from, next) => {
	store.commit('authRequired', !!to.matched[0].components.default.auth)
	next()
})

export default router
