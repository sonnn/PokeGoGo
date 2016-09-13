const initState = {
  pokemons: [],
  locations: [],
};

export default function pokegogo(state = initState, action) {
  switch (action.type) {
    case 'POKEGOGO_LOAD_LIST_SUCCESS':
      return {
        ...state,
        pokemons: action.pokemons,
      };
    case 'POKEGOGO_INIT':
    default:
      return state;
  }
}
