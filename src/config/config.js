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
	urls: {
		services: {
			protocol: 'http',			
			env: 'AWS',
			url: 'aws.amazon.com',
			port: 80
		}
	}
};

module.exports = function() {
	return config;
};