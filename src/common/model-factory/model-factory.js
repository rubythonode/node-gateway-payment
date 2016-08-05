'use strict';

let dbConnection = global.dbConnection;

function ModelFactory ( stringEntityName , fnGenerateEntityProperties ) {

	let model = {};
	let _public = {};
	
	function defineModel () {
		model = dbConnection.define ( stringEntityName , fnGenerateEntityProperties ( global.dbDriver ) );
	}

	function connect () {
		model.sync ( { force : true } ).then ( function () {
			log.info ( `Model [${stringEntityName}]  is ready!` );
		});
	}

	function makePublic () {
		_public = model;
	}

	function init () {
		defineModel();
		connect();
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