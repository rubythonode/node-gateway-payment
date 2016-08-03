'use strict';

let common = require ( '../common' );
let myPathFromRoot = common.commonFile;

function PathsReader ( objPaths ) {
	
	function path ( stringPathType , stringPath ) {

		let path = stringPath.split ( '/' );
		let _folder = path [ 0 ]; 
		let _file = path [ 1 ] ? path [ 1 ]  : path [ 0 ];
		let _root = myPathFromRoot + objPaths [ stringPathType ];
		let finalPath = _root + '/' + _folder + '/' + _file;

		return require ( finalPath );
	};

	return path;
}

function makePublic () {
	module.exports = PathsReader;
}	

function init () {
	makePublic();
}

init();
