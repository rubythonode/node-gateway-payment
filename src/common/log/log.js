'use strict';

var common = require ( '../common' );

var config = require ( common.commonFile + 'config/config' ) ();
var logConfig = config.log;
var logStreams = [];


var
	logComponent = {}
;

function setDependencies () {
	var bunyan = require ( 'bunyan' );

	function DevelopmentRawStream () {}

	DevelopmentRawStream.prototype.write = function ( rec ) {
		let severityLevel = bunyan.nameFromLevel [ rec.level ];
	    console [ severityLevel ] (
	    	'[%s] %s',
	        severityLevel.toUpperCase(),
	        rec.msg,
	        '\n--------------------------------------------------------------------------------'
	    );
	};

	var consoleLog = {
        level: logConfig.level,
        stream: new DevelopmentRawStream(),
        type: 'raw'
    };

    var fileLog = {
        level : logConfig.level,
        path : logConfig.file.path
    };

	switch ( logConfig.type ) {
		case 'file':
			logStreams.push ( fileLog );
			break;
		case 'all':
			logStreams.push ( fileLog , consoleLog );
			break;
		default:
			logStreams.push ( consoleLog );
	}

	logComponent = bunyan.createLogger({
		name : config.app.name,
		streams : logStreams
	});
}

function log ( strMessage , strType ) {

	let logType;

	switch ( strType ) {
		case 'warning' :
			logType = 'warn';
			break;
		case 'error' :
			logType = 'error';
			break;
		default :
			logType = 'info';

	}

	logComponent [ logType ] ( strMessage );
}

function generateLogInterface ( strLogType ) {
	return function () {
		var args = utils.getArrayFromArguments ( arguments );
		log ( args, strLogType );
	};
}

var logInterface = {
	info : generateLogInterface ( 'info' ),
	warn : generateLogInterface ( 'warn' ),
	error : generateLogInterface ( 'error' )
};

function makePublic () {
	module.exports = logInterface;
}	

function init () {
	setDependencies();
	makePublic();
}

init();
