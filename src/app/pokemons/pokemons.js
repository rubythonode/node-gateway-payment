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

		model
			.findOne({
				where : {
					name: product.name
				}
			})
			.then ( ( pokemons ) => {
				if ( !model.theresStock ( pokemons , product.quantity ) ) {
					return requestUtils.sendResponse ( res , {
						error :
							'Not enough ' +
							product.name +
							' in stock: ' +
							pokemons.stock
					} , 400 );
				}
				pagarme
					.pay ({
						product: model.name,
						price : pokemons.price,
						quantity : product.quantity,
						name : product.name,	
						card : paymentData
					})
					.then ( ( body ) => {
						if ( pagarme.isPaid ( body ) ) {
							model.removeFromStock ( pokemons , product.quantity )
							.then ( ( pokemons ) => requestUtils.sendResponse ( res , body )
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
	module.exports = new Pokemons();
}

function init () {
	makePublic ();
}

init ();