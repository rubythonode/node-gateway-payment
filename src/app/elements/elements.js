'use strict';

let model = require ( './model' );
let pagarme = getCommon ( 'pagarme' );

function sendResponse ( objResponseObject , message , intStatusCode = 200 ) {
	return objResponseObject.status ( intStatusCode ).send ( message );
}

function sendErrorResponse ( objResponseObject , message , intStatusCode = 500 ) {
	log.info ( JSON.stringify ( message , null , 4 ) );
	return sendResponse ( objResponseObject , message , intStatusCode );
}

function handleGenericError ( objResponseObject ) {
	return ( err ) => {
		return sendErrorResponse ( objResponseObject , err.response.body , err.response.statusCode );
	}
}

function Elements () {
	
	let _public = {};

	_public.getAll = ( req , res ) => {

		model
			.findAll()
			.then ( ( element ) => sendResponse ( res , element ) )
			.catch ( handleGenericError ( res ) )
		;
		
	};

	_public.createOne = ( req , res ) => {

		model
			.create ( req.body )
			.then ( ( element ) => sendResponse ( res , element ) )
			.catch ( handleGenericError ( res ) )
		;

	};

	_public.buyOne = ( req , res ) => {

		let paymentData =  {
			number : '4024007138010896',
			expiration_date : '1050',
			holder_name : 'Ash Ketchum',
			cvv : '123'
		};

		model
			.findOne({
				where : {
					name: req.body.name
				}
			})
			.then ( ( element ) => {
				if ( element.stock < req.body.quantity ) {
					return sendResponse ( res , {
						error: 'Not enough ' + element.name + ' in stock: ' + element.stock
					} , 400 );
				}
				pagarme
					.pay ({
						product: 'pokemon',
						price : element.price,
						quantity : req.body.quantity,
						name : element.name,	
						card : paymentData
					})
					.then ( ( body ) => {
						if ( body.status == 'paid' ) {

							element.stock = element.stock - req.body.quantity;
							
							element
								.save()
								.then ( ( element ) => {
									return sendResponse ( res , body );
								})
							;
						}
					})
					.catch ( handleGenericError ( res ) )
				;	

			})
			.catch ( ( err ) => {
				return sendErrorResponse ( res , {
					message : 'Houve um erro no servidor',
					error : err }
				);
			})
		;	

	};

	return _public;
}

function makePublic () {
	module.exports = new Elements();
}

function init () {
	makePublic ();
}

init ();