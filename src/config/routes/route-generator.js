function RouteGenerator ( objRouteObj ) {

	let _public = {};

	// Padrão para criação de rotas
	// {
	// 		nomedarota : {
	// 			path : 'nomedarota', // /nomedarota (a ser respondida no HTTP)
	// 			handler : 'onde_está_o_handler_da_rota' // controllers.nomedarota, interpretado no index.js
	// 			// (nomedarota deve ser uma pasta dentro da pasta app)
	// 		}
	// }

	let routes = objRouteObj || [];

	function RouteFactory ( strRouteName , strMethod , strHandlerMethod , strPath , strHandler ) {
		routes [ strRouteName ] = routes [ strRouteName ] || {};
		routes [ strRouteName ][ strMethod ] = routes [ strRouteName ][ strMethod ] || [];
		routes [ strRouteName ][ strMethod ].push ({
			'path': strPath,
			'handler': ( strHandler ? strHandler : strRouteName ) + '.' + strHandlerMethod
		});

		return routes [ strRouteName ];
	}

	// Gera um rota diretamente a partir da raiz, sem padrão
	function generate ( strRouteName , strMethod , strHandlerMethod , strPath ) {
		strPath = '/' + ( strPath ? strPath : '' );
		return RouteFactory ( strRouteName , strMethod , strHandlerMethod , strPath );
	}

	function makePublic () {
		_public = {
			generate
		};
	}

	function init () {
		makePublic();
	}

	init();

	return _public;
}

function makePublic () {
	module.exports = exports = RouteGenerator;
}	

function init () {
	makePublic();
}

init();
