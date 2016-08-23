'use strict';

let assert = require ( 'assert' );

let _public = {};

_public.gerarNumero = function ( intQuantCaracteres ) {
	return ( ( Date.now() ) + "" ).substr ( ( intQuantCaracteres ? intQuantCaracteres * -1 : 10 ) );
}

_public.gerarCNPJ = function () {
	return ( _public.gerarNumero ( 10 ) );
};

_public.theresDataOnArray = function ( res ) {
	assert ( !!res.body.length  );
};

_public.theresContentOnBody = function ( res ) {
	assert ( !!res.body.length );
};

_public.treatErrors = function ( objDoneIterator ) {
	var done = done || null;
	objDoneIterator = done || objDoneIterator || function() {};
	return function ( err , res ) {
		if ( err ) throw err;
		objDoneIterator();
	};
}

function tornarPublico () {
	module.exports = exports = _public;
}	

function init () {
	tornarPublico();
}

init();