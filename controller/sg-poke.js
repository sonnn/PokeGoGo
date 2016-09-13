'use strict';
const request = require('request');

const POKEMON_LIST_URL = 'https://sgpokemap.com/pokemon_list.json?v20';
const POKEMON_POSITION_URL = 'https://sgpokemap.com/query2.php?since=0';
const DEFAULT_FILTER = [
  1, 2, 3, 4, 6, 7, 9, 59, 65, 103, 113, 130, 131, 134, 135, 136, 137, 142, 143, 149];

class SGPoke {
  constructor() {
    this.pokeList = [];
  }

  getPokemonList() {
    return new Promise((resolve, reject) => {
      if (this.pokeList.length > 0) resolve(this.pokeList);

      request.get(POKEMON_LIST_URL, (error, response, body) => {
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

  getPokemonPosition(filter = DEFAULT_FILTER) {
    const filterString = filter.join(',');
    const url = `${POKEMON_POSITION_URL}&mons=${filterString}`;

    return new Promise((resolve, reject) => {
      request.get(url, (error, response, body) => {
        if (error) return reject(error);

        // parse body
        let res = body;

        try {
          if (typeof(res) === 'string') res = JSON.parse(body);
        } catch (err) {
          return reject(err);
        }

        return resolve(res.pokemons);
      });
    });
  }
}

module.exports = SGPoke;
