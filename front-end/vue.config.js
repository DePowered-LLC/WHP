const fs = require('fs');
const mainConfig = require('../config');

let configuration = {
	configureWebpack: function () {
		process.env.VUE_APP_TITLE = mainConfig.title;
	},
	devServer: {
		disableHostCheck: true,
		public: 'depowered.ru:8080'
	},
	productionSourceMap: false
};

if (mainConfig.ssl) {
	configuration.devServer.https = {
		key: fs.readFileSync('../' + mainConfig.ssl.key, 'utf8'),
		cert: fs.readFileSync('../' + mainConfig.ssl.cert, 'utf8')
	};
}

const configImport = (() => {
	let localConfig = {};
	return varName => {
		if(varName) localConfig[varName] = mainConfig[varName];
		else fs.writeFileSync('src/config.json', JSON.stringify(localConfig));
	};
})();

configImport('title');
configImport();

module.exports = configuration;
