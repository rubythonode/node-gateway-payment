'use strict';

let RouteGenerator = require ( './route-generator' );

let routes = [];
let route = new RouteGenerator ( routes );

function loadRoutes () {
	route.generate ( 'list-resources' , 'get' , 'getAll' );
	route.generate ( 'pokemons' , 'post' , 'buyOne' , 'pokemons/buy' );
	route.generate ( 'pokemons' , 'put' , 'createOne' , 'pokemons' );
	route.generate ( 'pokemons' , 'get' , 'getAll' , 'pokemons' );
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