'use strict';

let model = require ( './model' );
let pagarme = getCommon ( 'pagarme' );
let requestUtils = getCommon ( 'request-utils' );

function Pokemons () {
	
	let _public = {};

	_public.getAll = ( req , res ) => {

		model
			.findAll()
			.then ( ( pokemons ) => requestUtils.sendResponse ( res , pokemons ) )
			.catch ( requestUtils.handleGenericError ( res ) )
		;
		
	};

	_public.createOne = ( req , res ) => {

		model
			.create ( req.body )
			.then ( ( pokemons ) => requestUtils.sendResponse ( res , pokemons ) )
			.catch ( requestUtils.handleGenericError ( res ) )
		;

	};

	_public.buyOne = ( req , res ) => {

		let paymentData =  {
			number : '4024007138010896',
			expiration_date : '1050',
			holder_name : 'Ash Ketchum',
			cvv : '123'
		};

		let product = {
			name : req.body.name,
			quantity : req.body.quantity
		};

		function stepRemoveFromStock ( objResponse , objInstance , objResponseBody ) {
			if ( pagarme.isApproved ( objResponseBody ) ) {
				model
					.removeFromStock ( objInstance , product.quantity )
					.then ( ( objInstance ) => requestUtils.sendResponse ( objResponse , objResponseBody ) )
					.catch ( requestUtils.handleGenericError ( objResponse ) )
				;
			}
		}

		function stepSendPaymentToPagarme ( objResponse , objInstance ) {

			pagarme
				.pay ({
					product: model.name,
					price : objInstance.price,
					quantity : product.quantity,
					name : product.name,	
					card : paymentData
				})
				.then ( ( body ) => stepRemoveFromStock ( objResponse , objInstance , body ))
				.catch ( ( err ) => requestUtils.sendResponse ( objResponse , {
					error : 'Payment not approved'
				} , 400 ) )
			;

		}

		function stepVerifyStock ( objResponse , objInstance ) {
			if ( !model.theresStock ( objInstance , product.quantity ) ) {
				return requestUtils.sendResponse ( objResponse , {
					error :	`Not enough ${product.name} in stock: ${objInstance.stock}`
				} , 400 );
			}
			return stepSendPaymentToPagarme ( res , objInstance );
		}

		function stepFindProduct () {
			model
				.findOne( { where : { name: product.name } } )
				.then ( ( pokemons ) => stepVerifyStock ( res , pokemons ) )
				.catch ( ( err ) => requestUtils.sendResponse ( res , {
					error : `Not found ${product.name} in stock`
				} , 404 ) )
			;
		}

		function init () {
			stepFindProduct();
		}

		init ();

	};

	return _public;
}

function makePublic () {
	module.exports = new Pokemons();
}

function init () {
	makePublic ();
}

init ();