'use strict';

function Resource ( strResourceName, strVersion, callbackResponse, callbackRequest ) {

	var _public = {};

	return _public;
}

function makePublic () {
	module.exports = exports = Resource;
}

function init () {
	makePublic ();
}

init ();