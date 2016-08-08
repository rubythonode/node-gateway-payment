'use strict';

let model = require ( './model' );
let pagarme = getCommon ( 'pagarme' );
let requestUtils = getCommon ( 'request-utils' );

function Elements () {
	
	let _public = {};

	_public.getAll = ( req , res ) => {

		model
			.findAll()
			.then ( ( element ) => requestUtils.sendResponse ( res , element ) )
			.catch ( requestUtils.handleGenericError ( res ) )
		;
		
	};

	_public.createOne = ( req , res ) => {

		model
			.create ( req.body )
			.then ( ( element ) => requestUtils.sendResponse ( res , element ) )
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

		model
			.findOne({
				where : {
					name: product.name
				}
			})
			.then ( ( element ) => {
				if ( !model.theresStock ( element , product.quantity ) ) {
					return requestUtils.sendResponse ( res , {
						error :
							'Not enough ' +
							product.name +
							' in stock: ' +
							element.stock
					} , 400 );
				}
				pagarme
					.pay ({
						product: model.name,
						price : element.price,
						quantity : product.quantity,
						name : product.name,	
						card : paymentData
					})
					.then ( ( body ) => {
						if ( pagarme.isPaid ( body ) ) {
							model.removeFromStock ( element , product.quantity )
							.then ( ( element ) => requestUtils.sendResponse ( res , body )
							);
						}
					})
					.catch ( requestUtils.handleGenericError ( res ) )
				;	

			})
			.catch ( requestUtils.handleGenericError ( res ) )
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