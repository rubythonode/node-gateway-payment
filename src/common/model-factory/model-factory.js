'use strict';

let dbConnection = global.dbConnection;

function ModelFactory ( stringEntityName , fnGenerateEntityProperties ) {

	let model = {};
	let _public = {};
	
	function defineModel () {
		model = dbConnection.define ( stringEntityName , fnGenerateEntityProperties ( global.dbDriver ) );
	}

	function connect ( fnCallbackSuccess ) {
		model.sync ( { force : true } ).then ( function () {
			fnCallbackSuccess();
			log.info ( 'Model is ready!' );
		});
	}

	function makePublic () {
		_public = {
			connect
		};
	}

	function init () {
		defineModel();
		makePublic();
	}

	init();

	return _public;

}

function makePublic () {
	module.exports = exports = ModelFactory;
}

function init () {
	makePublic();
}

init();