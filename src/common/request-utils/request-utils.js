'use strict';

var enums = {};

enums.httpStatusCode = {
	'SUCCESS' : 200,
	'SUCCESS_CREATED' : 201,
	'NOT_FOUND' : 404,
	'REQUEST_ERROR' : 400,
	'SERVER_ERROR' : 500
};

function sendResponse ( objResponseObject , message , intStatusCode = enums.httpStatusCode [ 'SUCCESS' ] ) {
	return objResponseObject.status ( intStatusCode ).send ( message );
}

function sendErrorResponse ( objResponseObject , message , intStatusCode = enums.httpStatusCode [ 'SERVER_ERROR' ] ) {
	log.info ( JSON.stringify ( message , null , 4 ) );
	return sendResponse ( objResponseObject , message , intStatusCode );
}

function handleGenericError ( objResponseObject ) {
	return ( err ) => {
		let message = err;
		let statusCode = enums.httpStatusCode [ 'SERVER_ERROR' ];
		if ( err.response ) {
			message = err.response.body;
			statusCode = err.response.statusCode;
		}
		return sendErrorResponse ( objResponseObject , message , statusCode );
	}
}



function makePublic () {
	module.exports = exports = {
		sendResponse,
		sendErrorResponse,
		handleGenericError,
		enums : enums
	};
}

function init () {
	makePublic();
}

init();