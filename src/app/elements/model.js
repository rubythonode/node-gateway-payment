'use strict';

let ModelFactory = getCommon ( 'model-factory' );

let ElementsModel = new ModelFactory ( 'element' , ( lib ) => {
	return { name: {
		type: lib.STRING,
		allowNull: false
	},
	price: {
		type: lib.INTEGER,
		allowNull: false
	},
	stock: {
		type: lib.INTEGER,
		allowNull: true,
		defaultValue: 1
	} };
});

function makePublic () {
	module.exports = exports = ElementsModel;
}	

function init () {
	makePublic();
}

init();