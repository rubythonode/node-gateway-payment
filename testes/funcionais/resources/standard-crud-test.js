'use strict';

let supertest = require ( 'supertest' );
let assert = require ( 'assert' );
let utils = require ( '../resources/utils' )
let _public = {};

_public.test = function StandardCrudTest ( recurso , model ) {

	return function () {

		let idManipular = '';

		it ( '[CREATE_ONE] deve criar um registro' , function ( done ) {
			recurso
			.put ()
			.send ( model )
			.expect ( 200 )
			.end ( utils.treatErrors ( done ) );
		});

		it ( '[GET_ALL] deve obter todos os registros' , function ( done ) {
			recurso
			.get ()
			.expect ( 200 )
			.expect ( utils.theresDataOnArray , done )
			.end ( utils.treatErrors ( done ) );
		});

		// it ( '[GET_ONE] deve obter um registro' , function ( done ) {
		// 	recurso
		// 	.get ( idManipular )
		// 	.expect ( 200 )
		// 	.expect ( utils.theresDataOnArray , done )
		// 	.end ( utils.treatErrors ( done ) );
		// });

		// it ( '[UPDATE_ONE] deve alterar um registro' , function ( done ) {
		// 	recurso
		// 	.put ( idManipular )
		// 	.send ( model )
		// 	.expect ( 200 )
		// 	.end ( utils.treatErrors ( done ) );
		// });

		// it ( '[UPDATE_ONE_STATUS] deve alterar o status de um registro' , function ( done ) {
		// 	recurso
		// 	.put ( idManipular )
		// 	// Object.assign ( model , { registro : { status : 'I' } } )
		// 	.send ( model )
		// 	.expect ( 200 )
		// 	.end ( utils.treatErrors ( done ) );
		// });

		// it ( '[DELETE_ONE] deve apagar um registro' , function ( done ) {
		// 	recurso
		// 	.del ( idManipular )
		// 	.expect ( 200 )
		// 	.end ( utils.treatErrors ( done ) );
		// });
	}

}

_public.utils = utils;

function makePublic () {
	module.exports = exports = _public;
}	

function init () {
	makePublic();
}

init();

