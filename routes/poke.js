const express = require('express');
const SGPoke = require('../controller/sg-poke');
const sgpoke = new SGPoke();

const router = express.Router();

router.get('/list', function(req, res, next) {
	sgpoke.getPokemonList()
		.then(list => res.json(list))
		.catch(err => res.send(err));
});

router.get('/position', function(req, res, next) {
	sgpoke.getPokemonPosition()
		.then(list => res.json(list))
		.catch(err => res.send(err));
});

module.exports = router;
