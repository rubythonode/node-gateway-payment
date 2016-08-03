'use strict';

let common = getCommon ( 'resources' );
let resource = common.getStandard ( 'crud' );

function Pokemons ( req , res ) {
	let finalResource = new resource ();
	return finalResource;
}

function makePublic () {
	module.exports = new Pokemons();
}

function init () {
	makePublic ();
}

init ();