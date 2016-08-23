'use strict';

let supertest = require ( 'supertest' );
let config = require ( '../resources/config' );
let utils = require ( '../resources/utils' );

let recurso = config.gerarRecurso ( 'pokemons' );

let model = {
	name : 'Pikachu',
	price : utils.gerarNumero ( 2 ),
	stock : 10
};

let buyModel = {
	name : model.name,
	quantity : 1
};

let buyUnavailableModel = {
	name : 'Vaporeon',
	quantity : 1
};

describe ( 'Pokemons' , function () {

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

	it ( '[BUY_ONE] deve efetuar uma transação com registro existente' , function ( done ) {
			recurso
			.post ( 'buy' )
			.send ( buyModel )
			.expect ( 200 )
			.end ( utils.treatErrors ( done ) );
		}
	);

	it ( '[BUY_ONE] NÃO deve efetuar uma transação com estoque 0' , function ( done ) {
			recurso
			.post ( 'buy' )
			.send ( buyModel )
			.expect ( 400 )
			.end ( utils.treatErrors ( done ) );
		}
	);

	it ( '[BUY_ONE] NÃO deve efetuar uma transação com registro inexistente' , function ( done ) {
			recurso
			.post ( 'buy' )
			.send ( buyUnavailableModel )
			.expect ( 404 )
			.end ( utils.treatErrors ( done ) );
		}
	);

} );