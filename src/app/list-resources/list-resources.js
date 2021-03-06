'use strict';

let requestUtils = getCommon ( 'request-utils' );

// Index da API
function listResources ( req , res ) {
	
	let divider = '<br/>';
	let info = [];
	let actualRoutes = [];
	let index = [];

	actualRoutes = global.config.loadedRoutes.map ( route => {
		return (
			'['
			+ route.method.toUpperCase()
			+ '] <strong>'
			+ route.path
			+ '</strong>'
		);
	});

	index = ( info.concat ( actualRoutes ) ).join ( divider );

	// Devolvendo as rotas existentes
	requestUtils.sendResponse ( res , index );
}

function makePublic () {
	module.exports = exports = { getAll : listResources };
}	

function init () {
	makePublic();
}

init();
