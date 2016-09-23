import { get, post } from '../utils/http';

export const init = () => ({
  type: 'POKEGOGO_INIT',
});

export const loadPokemonListSuccess = list => ({
  type: 'POKEGOGO_LOAD_LIST_SUCCESS',
  pokemons: list,
});

export const loadPokemonListFail = error => ({
  type: 'POKEGOGO_LOAD_LIST_FAIL',
  error,
});

export const loadPokemonPositionFail = error => ({
  type: 'POKEGOGO_LOAD_POSITION_FAIL',
  error,
});

export const updatePokemonMap = pokemonPosistions => ({
  type: 'UPDATE_POKEMON_MAP',
  pokemonPosistions,
});

export const updateFilter = pokemon => ({
  type: 'UPDATE_POKEMON_FILTER',
  pokemon,
});

export const updateBounds = ({ southWest, northEast }) => ({
  type: 'UPDATE_BOUNDS',
  southWest,
  northEast,
});

export const updatePokemonInPath = (filteredPositions, bounds) => {
  const { southWest, northEast } = bounds;
  const filtered = filteredPositions.filter(f => {
    const { a, o } = f;
    return a >= southWest.lat && a <= northEast.lat
      && o >= southWest.lng && o <= northEast.lng;
  });

  return {
    type: 'UPDATE_POKEMON_IN_PATH',
    pokemons: filtered,
  };
};

export const getDirectionSuccess = directions => ({
  type: 'POKEGOGO_GET_DIRECTIONS_SUCCESS',
  directions,
});

export const updatePathTable = result => ({
  type: 'POKEMON_UPDATE_PATH_TABLE',
  chromosomes: result,
});

export const getDirections = pokemons => (dispatch) => {
  post('/poke/directions', { body: JSON.stringify({ pokemons }) }).then(directions => {
    dispatch(getDirectionSuccess(directions));
  }).catch(error => {
    console.log(error);
  });
};

export const visualise = chromosome => ({
  type: 'POKEGOGO_VISUALISE_CHROMOSOME',
  chromosome,
});

export const getPokemonPositions = () => (dispatch) => {
  get('/poke/position').then(pos => {
    dispatch(updatePokemonMap(pos));
  }).catch(error => {
    dispatch(loadPokemonPositionFail(error));
  });
};

export const loadPokemonList = () => (dispatch) => {
  get('/poke/list').then(list => {
    const out = list.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    dispatch(loadPokemonListSuccess(out));
    dispatch(getPokemonPositions());
  }).catch(error => {
    dispatch(loadPokemonListFail(error));
  });
};
