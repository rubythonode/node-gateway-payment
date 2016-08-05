'use strict';



function Elements () {
	
	let _public = {};

	_public.getAll = ( req , res ) => {

		let model = require ( './model' ).connect (
			(model) => { model
		.findAll()
		.then ( ( elements ) => {
			res.status ( 200 ) .send ( elements );
		})
		.catch( (err) => {
			log.info ( JSON.stringify ( err , null , 4) );
			return res.status ( err.response.statusCode ).send ( err.response.body );
		})
	;
		); }


	

		
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