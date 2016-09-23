'use strict';

const mock = require('./directions');
const PokemonHuntPathGA = require('./simple-ga').PokemonHuntPathGA;

const pokeHunt = new PokemonHuntPathGA(mock.pokemons, mock.directions);

const min = pokeHunt.generatePopulation();

console.log(min)
