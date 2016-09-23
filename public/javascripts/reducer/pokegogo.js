import _ from 'lodash';

const initState = {
  pokemons: [],
  pokemonPosistions: [],
  bounds: {
    southWest: [],
    northEast: [],
  },
  pokemonInPath: [],
  directions: [],
  chromosomes: [],
};

export default function pokegogo(state = initState, action) {
  switch (action.type) {
    case 'POKEGOGO_LOAD_LIST_SUCCESS':
      return {
        ...state,
        pokemons: action.pokemons,
      };
    case 'UPDATE_POKEMON_MAP':
      return {
        ...state,
        pokemonPosistions: action.pokemonPosistions,
      };
    case 'UPDATE_POKEMON_FILTER': {
      const pokemons = _.cloneDeep(state.pokemons);
      const { pokemon } = action;
      const found = _.find(pokemons, { id: pokemon.id });

      if (found) found.show_filter = !pokemon.show_filter;

      return {
        ...state,
        pokemons,
      };
    }
    case 'UPDATE_BOUNDS': {
      const { southWest, northEast } = action;

      return {
        ...state,
        bounds: {
          southWest: [southWest.lat, southWest.lng],
          northEast: [northEast.lat, northEast.lng],
        },
      };
    }
    case 'UPDATE_POKEMON_IN_PATH': {
      const { pokemons } = state;
      const clone = action.pokemons.map(pk => {
        const found = _.find(pokemons, f => parseInt(f.id, 10) === pk.i);
        if (found) {
          return {
            ...pk,
            name: found.name,
          };
        }
        return pk;
      });
      return {
        ...state,
        pokemonInPath: clone,
      };
    }
    case 'POKEGOGO_GET_DIRECTIONS_SUCCESS':
      return {
        ...state,
        directions: action.directions,
      };
    case 'POKEMON_UPDATE_PATH_TABLE':
      return {
        ...state,
        chromosomes: action.chromosomes,
      };
    case 'POKEGOGO_VISUALISE_CHROMOSOME':
      return {
        ...state,
        vChromosome: action.chromosome,
      };
    case 'POKEGOGO_INIT':
    default:
      return state;
  }
}
