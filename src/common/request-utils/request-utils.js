'use strict';

function sendResponse ( objResponseObject , message , intStatusCode = 200 ) {
	return objResponseObject.status ( intStatusCode ).send ( message );
}

function sendErrorResponse ( objResponseObject , message , intStatusCode = 500 ) {
	log.info ( JSON.stringify ( message , null , 4 ) );
	return sendResponse ( objResponseObject , message , intStatusCode );
}

function handleGenericError ( objResponseObject ) {
	return ( err ) => {
		let message = err;
		let statusCode = 500;
		if ( err.response ) {
			message = err.response.body;
			statusCode = err.response.statusCode || 500;
		}
		return sendErrorResponse ( objResponseObject , message , statusCode );
	}
}

function makePublic () {
	module.exports = exports = {
		sendResponse,
		sendErrorResponse,
		handleGenericError
	};
}

function init () {
	makePublic();
}

init();