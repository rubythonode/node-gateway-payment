'use strict';

function Monitor ( strResourceName ) {
	var _public = this;

	strResourceName = strResourceName.toUpperCase();

	_public.log = function ( strResource ) {
		strResource = strResource ? '::' + strResource.toUpperCase() : '';
		strResource = strResourceName + strResource;
		var args = utils.getArrayFromArguments ( arguments ).slice( 1 );
		log.info ( strResource , args );
	}

	return _public;
}

function makePublic () {
	module.exports = exports = Monitor;
}	

function init () {
	makePublic();
}

init();
