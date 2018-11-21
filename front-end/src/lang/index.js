class LangController {
	constructor (options) {
		this.available = {};
		this.current = null;
		this.default = 'en';
		this.register = ['en'];
		this.vueContexts = [];
		Object.assign(this, options);

		this._list = [];
		this.register.forEach(lang => {
			this.available[lang] = require('./' + lang);
			this._list.push({
				code: lang,
				name: this.available[lang].LanguageName
			});
			console.log(`Language '${lang}' loaded`);
		});

		const savedLang = sessionStorage.getItem('lang');
		const browserLang = (navigator.language || navigator.userLanguage).split('-')[0];
		if (savedLang && this.has(savedLang)) this.set(savedLang);
		else if (browserLang && this.has(browserLang)) this.set(browserLang);
		else this.set(this.default);
	}

	has (code) { return Object.keys(this.available).includes(code); }

	set (code) {
		if (code === this.current) return true;
		if (this.has(code)) {
			this.current = code;

			const makeLangVar = (dictionary, prop) => {
				if (prop === '_list') return this._list;
				let current = dictionary[prop];
				const langFunc = (...args) => {
					if (Array.isArray(args[0]) || typeof args[0] === 'object') args = args[0];
					Object.keys(args).forEach(key => {
						current = current.split('$' + key).join(args[key]);
					});
					return current;
				};
				langFunc.toString = () => current;
				langFunc.toLowerCase = () => current.toLowerCase();
				return langFunc;
			};

			this.dictionary = new Proxy({
				...this.available[code],
				_list: this._list
			}, {
				get: makeLangVar
			});

			sessionStorage.setItem('lang', code);
			this.vueContexts.forEach(context => {
				context.lang = this.dictionary;
			});
			return true;
		} else {
			console.log(`Language '${code}' not found`);
			return false;
		}
	}

	install (Vue) {
		const self = this;
		Vue.mixin({
			data: () => ({ lang: self.dictionary }),
			created () { self.vueContexts.push(this); },
			methods: { setLang: self.set.bind(self) }
		});
	}
}

export default LangController
