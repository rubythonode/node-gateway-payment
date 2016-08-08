'use strict';

let routeGenerator = require ( './route-generator' );

let routes = [];
let route = new routeGenerator ( routes );

function loadRoutes () {
	route.generate ( 'list-resources' , 'get' , 'getAll' );
	route.generate ( 'elements' , 'post' , 'buyOne' , 'elements/buy' );
	route.generate ( 'elements' , 'put' , 'createOne' , 'elements' );
	route.generate ( 'elements' , 'get' , 'getAll' , 'elements' );
}

function getRoutes () {
	return routes;
}

function makePublic () {
	module.exports = exports = getRoutes;
}

function init() {
	loadRoutes();
	makePublic();
}

init();