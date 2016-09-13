import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  init,
  loadPokemonList,
} from '../actions';

import { PokemonTable } from './PokemonTable';
import { PokemonMap } from './PokemonMap';

export class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pokemons: PropTypes.array,
  }


  constructor(props) {
    super(props);

    this.dispatch = props.dispatch;
  }

  componentWillMount() {
    this.dispatch(init());
  }

  componentDidMount() {
    this.dispatch(loadPokemonList());
  }

  render() {
    const { pokemons } = this.props;

    return (
      <div className="main-app">
        <PokemonMap />
        <PokemonTable pokemons={pokemons} />
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { pokemons } = state.app;

  return {
    pokemons,
  };
};

export default connect(mapStateToProps)(App);
