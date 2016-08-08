'use strict';

let ModelFactory = getCommon ( 'model-factory' );

let myName = 'pokemon'

let ElementsModel = new ModelFactory ( myName , ( lib ) => {
	return { 
		name: {
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
		}
	};
});

ElementsModel.name = myName;

ElementsModel.theresStock = function ( objInstance , intQuantityToRemove ) {
	return objInstance.stock >= intQuantityToRemove;
};

ElementsModel.removeFromStock = function ( objInstance , intQuantityToRemove ) {
		objInstance.stock = objInstance.stock - intQuantityToRemove;
		return objInstance.save();
};

function makePublic () {
	module.exports = exports = ElementsModel;
}	

function init () {
	makePublic();
}

init();