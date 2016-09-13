import { get } from '../utils/http';

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

export const getPokemonPositions = list => (dispatch) => {
  const filter = list.filter(f => f.show_filter === false).map(m => m.id);

  get(`/poke/position?filter=${filter.join('&filter=')}`).then(posts => {
    console.log(posts);
  }).catch(error => {
    console.log(error);
  });
};

export const loadPokemonList = () => (dispatch) => {
  get('/poke/list').then(list => {
    const out = list.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    dispatch(loadPokemonListSuccess(out));
    dispatch(getPokemonPositions(out));
  }).catch(error => {
    dispatch(loadPokemonListFail(error));
  });
};
