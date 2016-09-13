'use strict';

const SGPoke = require('../controller/sg-poke');
const sgpoke = new SGPoke();

sgpoke.getPokemonList().then(list => {
	console.log(list);
});

sgpoke.getPokemonPosition().then(list => {
	console.log(list);
});