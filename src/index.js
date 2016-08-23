'use strict';

let
	// Node arguments
	nodeArgs,
	// Local arguments
	args = {
		port: '',
		name: ''
	},
	// Port of application
	port,
	// Instance name
	instanceName,
	// The application
	app,
	// The framework
	express,
	// Generic Configurations  ( server, paths )
	config,
	// Generic tools
	utils,
	// Component to control log
	log,
	// The modules to preload in this application
	modulesDependencies,
	// The loaded controllers
	controllers = {},
	// Generate the path under a pattern and do the require
	dependenciesRequirer,
	// Easy wrapper to get the libs, without passing the path
	getCommon,
	// Easy wrapper to get dependencies, without passing the path
	getDependency,
	// Component to read the routes
	routeReader,
	// Component to parse the HTTP body requisition
	HTTPBodyParser,
	// DataBase driver
	dbDriver,
	// DataBase connection
	dbConnection,
	// Security middleware solution
	securityMiddleware
;

const
	configPath = './config/config',
	dependenciesGetterPath = 'dependencies-getter/dependencies-getter'
;

init ();

function init () {
	stepLoadNodeArguments ();
	stepSetDependencies ();
	stepConfigServer ();
	stepConnectToMainDataBase ();
	stepReadRoutes ();
	stepStartServer ();
}

/**
 * stepLoadNodeArguments - Get and bind node application arguments
 */
function stepLoadNodeArguments () {

	nodeArgs = process.argv.slice ( 2 );

	nodeArgs.forEach ( item => {
		let arg = item.split ( '=' );
		args [ arg [ 0 ] ] = arg [ 1 ];
	});
}

/**
 * stepSetDependencies - The step to set all required things
 */
function stepSetDependencies () {

	express = require ( 'express' );
	securityMiddleware = require ( 'helmet' );
	HTTPBodyParser = require ( 'body-parser' );
	dbDriver = require ( 'sequelize' );
	global.dbDriver = dbDriver;

	// Setting configurations
	config = require ( configPath ) ();
	global.config = config;

	// Dependencies requirer
	dependenciesRequirer = new require (
		config.paths.root
		+ '/'
		+ config.paths.common
		+ '/'
		+ dependenciesGetterPath
	 ) ( config.paths );

	getCommon = dependenciesRequirer.getCommon;
	global.getCommon = getCommon;
	getDependency = dependenciesRequirer.get;

	// Setting utils
	utils = getCommon ( 'utils' );
	global.utils = utils;

	// Setting log component
	log = getCommon ( 'log' );
	global.log = log;

	// Getting routes and setting Route Component
	config.routes = getDependency ( 'config', 'routes' ) ();
	routeReader = getCommon ( 'route-reader' );

	// If the port changes, sets the config
	port = args.port || process.env.PORT || config.server.port;
	global.config.server.actualPort = port;

	// If the name changes, sets the config
	instanceName = args.name || config.app.name;
	global.config.app.actualName = instanceName;
}

/**
 * stepConfigServer - The step to set container configs
 */
function stepConfigServer () {

	app = express ();

	// Using Helmet: security
	app.use ( securityMiddleware() );

	// Allowing CORS for communication
	app.use ( ( req , res , next ) => {
		res.header ( "Access-Control-Allow-Origin", "*" );
		res.header ( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
		res.header ( "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE" );
		next ();
	});

	app.use ( HTTPBodyParser.urlencoded ({
		extended: true
	}));

	app.use ( HTTPBodyParser.json () );
}

function stepConnectToMainDataBase () {
	dbConnection = new dbDriver (
		'elements',
		null,
		null, {
			dialect: 'sqlite'
		})
	;

	global.dbConnection = dbConnection;
}

/**
 * stepReadRoutes - Read routes, load controllers, bind controllers to paths
 */
function stepReadRoutes () {

	/**
	 * loadControllers - the step to load the controllers before reading routes
	 * @param  {string} stringModuleName - the name of the module to load
	 */
	function loadControllers ( stringModuleName , stringSubFile ) {
		let filePath = stringModuleName + ( stringSubFile ? '/' + stringSubFile : '' );
		controllers [ stringModuleName ] = getDependency ( 'app' , filePath );
	}

	// How to bind the routes
	function customRouteReader ( stringRestVerb, stringRoutePath, stringHandler , stringMethod , stringSubFile ) {

		let moduleRoot = stringHandler;
		loadControllers ( moduleRoot , stringSubFile );
		let handler = controllers [ stringHandler ] [ stringMethod ];
		
		// Express way: app [ method ]  (  path , handler  )
		app [ stringRestVerb ] ( stringRoutePath, handler );
		// Load the routes information
		config.loadedRoutes.push ( { method : stringRestVerb , path : stringRoutePath } );
	}

	routeReader = new routeReader ( customRouteReader );
	routeReader ( config.routes );
}

/**
 * stepStartServer - Exposes container and application to the world
 */
function stepStartServer () {

	dbConnection
		.authenticate ()
		.then ( () => {

			return app.listen ( port , () => {
				log.info (
					'Instância ['
					+ instanceName
					+ '] disponível na porta ['
					+ port
					+ ']'
				 );
			});

		})
		.catch ( ( err ) => {
			throw Error ( err );
		})
	;

	
}