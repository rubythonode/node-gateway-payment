'use strict';

let model = require ( './model' );

function Elements () {
	
	let _public = {};

	_public.getAll = ( req , res ) => {

		model
			.findAll()
			.then ( ( elements ) => {
				res.status ( 200 ) .send ( elements );
			})
			.catch ( ( err ) => {
				log.info ( JSON.stringify ( err , null , 4 ) );
				return res.status ( err.response.statusCode ).send ( err.response.body );
			})
		;
		
	}

	_public.createOne = ( req , res ) => {

		model
			.create ( req.body )
			.then ( function sendModel ( element ) {
				res.send ( element )
			})
			.catch ( ( err ) => {
				log.info ( JSON.stringify ( err , null , 4 ) );
				return res.status ( err.response.statusCode ).send ( err.response.body );
			})
		;

	}

	_public.buyOne = ( req , res ) => {

		
		
	}

	return _public;
}

function makePublic () {
	module.exports = new Elements();
}

function init () {
	makePublic ();
}

init ();