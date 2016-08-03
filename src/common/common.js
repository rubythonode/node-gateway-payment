'use strict';

let commonPathFromRoot = '../';
let commonFile = commonPathFromRoot + '../';

let
	common = {
		commonFolder : commonPathFromRoot,
		commonFile : commonFile
	}
;

function makePublic () {
		module.exports = common;
}	

function init () {
	makePublic();
}

init();
