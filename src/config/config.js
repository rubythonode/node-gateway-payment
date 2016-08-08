'use strict';

var config = {
	app: {
		name: 'App',
		// Loaded after the app boot
		actualName: ''
	},
	routes: {},
	// Loaded after the app boot
	loadedRoutes : [],
	encoding: 'utf8',
	server: {
		port: 3000,
		// Loaded after the app boot
		actualPort: ''
	},
	paths: {
		root : '.',
		app : 'app',
		config : 'config',
		common : 'common'
	},	
	log: {
		// info, warn, error
		level: 'info',
		// file, console, all
		type : 'console',
		file : {
			path : './../log/app.log'
		}
	},
	resources : {
		defaultVersion : 'v1'
	},
	services : {
		pagarme : {
			protocol: 'https',			
			env : 'Pagar.me',
			url : 'api.pagar.me/1/transactions',
			port : 80,
			apiKey : 'ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg'
		}
	}
};

module.exports = function() {
	return config;
};