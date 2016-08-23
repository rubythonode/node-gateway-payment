'use strict';

let utils = require ( './utils' );
let supertest = require ( 'supertest' );
const assert = require('assert');
let config = {};

config.url = 'http://localhost:3000';

config.assert = assert;

config.gerarRecurso = function ( strUrl ) {
	
	let _public;

	let _url = config.url;

	let recurso = {};

	function gerarRecurso () {
		recurso = supertest ( _url );
	}

	function _interface ( strMethod ) {
		return function ( strArg ) {
			strArg = strArg || '';
			return recurso [ strMethod ] ( '/' + strUrl + '/' + strArg );
		}
	}

	function tornarPublico () {
		_public = {
			get : new _interface ( 'get' ),
			post : new _interface ( 'post' ),
			put : new _interface ( 'put' ),
			del : new _interface ( 'del' )
		}
	}
	
	function init () {
		gerarRecurso();
		tornarPublico();
	}

	init();

	return _public;
};

function tornarPublico () {
	module.exports = exports = config;
}	

function init () {
	tornarPublico();
}

init();
