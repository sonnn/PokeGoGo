'use strict';
const request = require('request');

const POKEMON_LIST = require('./poke-list');
const POKEMON_POSITION_URL = 'https://sg-pogo.appx.hk/top';

function getGoogleDirectionAPI(origin, destination) {
  const api = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=walking&key=AIzaSyAFBqLuINxyc1cL4zvlQeD6BpvWDEQS0P8`;
  return api;
}

class SGPoke {
  constructor() {
    this.pokeList = [];
  }

  getPokemonList() {
    return new Promise((resolve) => {
      resolve(POKEMON_LIST);
    });
  }

  getPokemonPosition() {
    return new Promise((resolve, reject) => {
      request.get(POKEMON_POSITION_URL, (error, response, body) => {
        if (error) return reject(error);

        // parse body
        let res = body;

        try {
          if (typeof(res) === 'string') res = JSON.parse(body);
        } catch (err) {
          return reject(err);
        }

        return resolve(res);
      });
    });
  }

  buildMatrix(pokemons) {
    const len = pokemons.length;
    const result = [];

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        result.push([pokemons[i], pokemons[j]]);
      }
    }
    return result;
  }

  getDirectionMatrix(pokemons) {
    const matrix = this.buildMatrix(pokemons);

    return Promise.all(matrix.map(mx => new Promise((resolve, reject) => {
      const origin = `${mx[0].a},${mx[0].o}`;
      const dest = `${mx[1].a},${mx[1].o}`;
      const api = getGoogleDirectionAPI(origin, dest);

      request.get(api, (error, response, body) => {
        if (error) reject(error);

        let res = body;

        try {
          if (typeof(res) === 'string') res = JSON.parse(body);
        } catch (err) {
          return reject(err);
        }

        return resolve({
          origin: mx[0],
          destination: mx[1],
          direction: res,
        });
      }); })
    ));
  }
}

module.exports = SGPoke;
