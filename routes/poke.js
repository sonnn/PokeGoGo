const express = require('express');
const SGPoke = require('../controller/sg-poke');
const sgpoke = new SGPoke();
const router = express.Router();

router.get('/list', (req, res) => {
  sgpoke.getPokemonList()
		.then(list => res.json(list))
		.catch(err => res.send(err));
});

router.get('/position', (req, res) => {
  sgpoke.getPokemonPosition()
		.then(list => res.json(list))
		.catch(err => res.send(err));
});

router.post('/directions', (req, res) => {
  const pokemons = req.body.pokemons;
  sgpoke.getDirectionMatrix(pokemons)
		.then(list => res.json(list))
		.catch(err => res.send(err));
});

module.exports = router;
