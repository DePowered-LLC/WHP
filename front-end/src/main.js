import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import config from './config'
import LangController from './lang'
import './components'

const lang = new LangController({
	register: ['en', 'ru']
});
Vue.use(lang);

Vue.mixin({
	data: () => ({ config })
});

/* eslint no-extend-native: ["error", { "exceptions": ["String"] }] */
String.prototype.firstUpper = function () {
	return this.slice(0, 1).toUpperCase() + this.slice(1);
};

Vue.config.productionTip = false
new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app');
