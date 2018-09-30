import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/Main.vue'
import E404 from '@/views/E404.vue'
import store from './store'

import AuthRegister from '@/views/auth/Register.vue'
import AuthLogin from '@/views/auth/Login.vue'

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
			component: AuthRegister
		},
		{
			path: '/auth/login',
			name: 'auth-login',
			component: AuthLogin
		},
		{
			path: '*',
			component: E404
		}
	]
});

router.beforeEach((to, from, next) => {
	store.commit('authRequired', !!to.matched[0].components.default.auth);
	next();
});

export default router
