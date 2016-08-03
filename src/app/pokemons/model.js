var PokemonModel = sequelize.define('pokemon', {
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

function makePublic () {
	module.exports = exports = PokemonModel;
}	

function init () {
	makePublic();
}

init();