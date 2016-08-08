'use strict';

let request = require ( 'request-promise' );

let	url =
	global.config.services.pagarme.protocol +
	'://' +
	global.config.services.pagarme.url +
	(
		global.config.services.pagarme.port === 80 || global.config.services.pagarme.port === '' ?
		'' :
		':' + global.config.services.pagarme.port
	)
;

let apiKey = global.config.services.pagarme.apiKey;

function Pagarme () {
	
	let _public = {};

	_public.pay = ( objPayment ) => {
		return request({
			uri : url,
			method: 'POST',
			json: {
				api_key : apiKey,
				amount : objPayment.price * objPayment.quantity * 100,
				card_number : objPayment.card.number,
				card_expiration_date : objPayment.card.expiration_date,
				card_holder_name : objPayment.card.holder_name,
				card_cvv : objPayment.card.cvv,
				metadata : {
					product : objPayment.product,
					name : objPayment.name,
					quantity : objPayment.quantity
				}
			}
		});
	};

	return _public;
}

function makePublic () {
	module.exports = exports = Pagarme();
}

function init () {
	makePublic();
}

init();
