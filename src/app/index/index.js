'use strict';

// Index da API
function listRoutes ( req , res ) {
	
	let divider = '<br/>';
	let info = [];
	let actualRoutes = [];
	let index = [];

	actualRoutes = config.loadedRoutes.map ( route => {
		return ( '[' + route.method.toUpperCase() + '] <strong>' + route.path + '</strong>' );
	});

	index = ( info.concat ( actualRoutes ) ).join ( divider );

	// Devolvendo as rotas existentes
	res.send ( index );
}

function makePublic () {
	module.exports = exports = { getAll : listRoutes };
}	

function init () {
	makePublic();
}

init();
