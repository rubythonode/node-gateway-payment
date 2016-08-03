'use strict';

function Utils () {

	var me = this;

	/**
	 * copyObj - Clones a object, without memory reference
	 * @param  {object} objToCopy - The object to copy
	 * @return {object} The copied object
	 */
	me.copyObj = function copyObj ( objToCopy ) {
		return Object.assign ( {} , objToCopy );
	};

	/**
	 * getArrayFromArguments - Convert a Arguments object to Array
	 * @param  {Arguments object} argsArguments the arguments object
	 * @return {array}
	 */
	me.getArrayFromArguments = function ( argsArguments ) {
		return Array.prototype.slice.call ( argsArguments );
	};

	me.capitalizeFirstLetter = function ( string ) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return me;
}

function makePublic () {
	module.exports = new Utils();
}	

function init () {
	makePublic();
}

init();
