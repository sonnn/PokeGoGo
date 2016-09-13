import { combineReducers } from 'redux';
import pokegogo from './pokegogo';

const pokeApp = combineReducers({
  app: pokegogo,
});

export default pokeApp;
