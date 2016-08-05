function RoutesHelper ( objRouteObj ) {

	let _public = {};

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
	function generateRoute ( strRouteName , strMethod , strHandlerMethod , strPath ) {
		strPath = '/' + ( strPath ? strPath : '' );
		return RouteFactory ( strRouteName , strMethod , strHandlerMethod , strPath );
	}

	function makePublic () {
		_public = {
			generateRoute
		};
	}

	function init () {
		makePublic();
	}

	init();

	return _public;
}

function makePublic () {
	module.exports = exports = RoutesHelper;
}	

function init () {
	makePublic();
}

init();
