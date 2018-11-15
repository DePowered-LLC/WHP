import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Main from '@/views/Main.vue'
import E404 from '@/views/E404.vue'

import AuthRegister from '@/views/auth/Register.vue'
import AuthLogin from '@/views/auth/Login.vue'

import SitesMain from '@/views/sites/Main.vue'
import SitesCreate from '@/views/sites/Create.vue'

Vue.use(Router);
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
			path: '/sites',
			name: 'sites-main',
			component: SitesMain
		},
		{
			path: '/sites/create',
			name: 'sites-create',
			component: SitesCreate
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
