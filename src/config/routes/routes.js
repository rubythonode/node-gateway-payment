'use strict';

// Padrão para criação de rotas
// {
// 		nomedarota : {
// 			path : 'nomedarota', // /nomedarota (a ser respondida no HTTP)
// 			handler : 'onde_está_o_handler_da_rota' // controllers.nomedarota, interpretado no index.js
// 			// (nomedarota deve ser uma pasta dentro da pasta app)
// 		}
// }

let routes = [];

let helper = new require ( './routes_helper' )( routes );

function loadRoutes () {
	helper.generateRoute ( 'index' , 'get' , 'getAll' );
	helper.generateRoute ( 'elements' , 'post' , 'buyOne' , 'elements/buy' );
	helper.generateRoute ( 'elements' , 'get' , 'getAll' , 'elements' );
	helper.generateRoute ( 'elements' , 'put' , 'createOne' , 'elements' );
	
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