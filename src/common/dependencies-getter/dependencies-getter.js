'use strict';

var common = require ( '../common' );

var pathsReaderComponent = require ( common.commonFolder + 'paths-reader/paths-reader' );

function DependenciesGetter ( objPathsConfig ) {

	var _public = {};

	var pathsReaderInterface = {};

	function get ( stringLibType , stringLibName ) {

		if ( !stringLibName ) {
			return;
		}

		return pathsReaderInterface ( stringLibType , stringLibName );
	}

	function getCommon ( stringLibName ) {
		return get ( 'common' , stringLibName );
	}

	function generateDependencies () {
		pathsReaderInterface = new pathsReaderComponent ( objPathsConfig );
	}

	function makePublic () {
		_public = {
			get : get,
			getCommon : getCommon
		};
	}	
	
	function init () {
		generateDependencies();
		makePublic();
	}
	
	init();

	return _public;

}

function makePublic () {
	module.exports = exports = DependenciesGetter;
}

function init () {
	makePublic();
}

init();
