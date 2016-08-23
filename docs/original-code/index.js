var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('elements', null, null, {
	dialect: 'sqlite'
});
var bodyParser = require('body-parser');
var request = require('request-promise');

app.use(bodyParser.json());

app.listen(3000, function () {
	console.log('Listening on http://localhost:3000');
});

var Model = sequelize.define('element', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	stock: {
		type: Sequelize.INTEGER,
		allowNull: true,
		defaultValue: 1
	}
});

Model.sync({force: true}).then(function () {
	console.log('Model is ready!');
});

app.get('/get-elements', function (req, res) {
	Model.findAll()
		.then(function listOfModels(elements){
			res.send(elements);
		})
});

app.put('/create-elements', function (req, res) {
	Model.create(req.body)
		.then(function sendModel(element){
			res.send(element)
		})
});

app.post('/buy-elements', function (req, res) {
	Model.findOne({
		where: {
			name: req.body.name
		}
	})
	.then(function(element) {
		if (element.stock < req.body.quantity) {
			return res.status(400).send({
				error: 'Not enought ' + element.name + ' in stock: ' + element.stock
			})
		}

		request({
			uri: 'https://api.pagar.me/1/transactions',
			method: 'POST',
			json: {
				api_key: "ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg",
				amount: element.price * req.body.quantity * 100,
				card_number: "4024007138010896",
				card_expiration_date: "1050",
				card_holder_name: "Ash Ketchum",
				card_cvv: "123",
				metadata: {
					product: 'pokemon',
					name: element.name,
					quantity: req.body.quantity
				}
			}
		})
		.then(function (body){
			if (body.status == 'paid') {

				element.stock = element.stock - req.body.quantity;
				element.save()
					.then(function(element) {
						res.send(body);
					})
			}
		})
		.catch(function (err){
			console.log(JSON.stringify(err, null, 4));
			return res.status(err.response.statusCode).send(err.response.body);
		})

	})

});


