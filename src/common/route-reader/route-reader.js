'use strict';

function RouteReader ( fnCallbackToInterpretateRoutes ) {

	function reader ( objRoutesWithPathsAndHandlers ) {

		let routes = objRoutesWithPathsAndHandlers;

		if ( ! Object.keys ( routes ).length ) {
			throw Error ( 'Rotas: sem rotas definidas. Configure em config/routes.js' );
		}

		for ( let route in routes ) {
			let verbs = routes [ route ];
			for ( let verb in verbs ) {
				let configs = verbs [ verb ];
				configs.forEach ( ( config ) => {
					let path = config.path;
					let comp = config.handler.split ( '.' );
					let file = comp[0].split('/');
					let handler = file[0];
					let subFile = file[1] || null;
					let method = comp[1];
					fnCallbackToInterpretateRoutes.call ( this , verb , path , handler , method , subFile );
				});
			}
		}
	}

	return reader;	
}

function makePublic () {
	module.exports = RouteReader;
}

function init () {
	makePublic();
}

init();