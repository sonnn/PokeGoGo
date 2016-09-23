import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  init,
  loadPokemonList,
  updateBounds,
  updatePokemonInPath,
  getDirections,
  updatePathTable,
} from '../actions';

import { PokemonTable } from './PokemonTable';
import { PokemonMap } from './PokemonMap';
import { PokemonInPathTable } from './PokemonInPathTable';
import { PokemonHuntGA } from '../utils/pokemon-hunt-ga';
import { PathTable } from './PathTable';

export class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pokemons: PropTypes.array,
    pokemonPosistions: PropTypes.array,
    bounds: PropTypes.object,
    pokemonInPath: PropTypes.array,
    directions: PropTypes.array,
    chromosomes: PropTypes.array,
    vChromosome: PropTypes.any,
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

  getBounds(filteredPositions) {
    const { lmap } = this.refs['pokemon-map'];
    const bounds = lmap.leafletElement.getBounds();
    const { _southWest: southWest, _northEast: northEast } = bounds;
    this.dispatch(updateBounds({ southWest, northEast }));
    this.dispatch(updatePokemonInPath(filteredPositions, { southWest, northEast }));
  }

  getPokemonMatrix(pokemonInPath) {
    this.dispatch(getDirections(pokemonInPath));
  }

  hunt(pokemons, directions) {
    const hunter = new PokemonHuntGA(pokemons, directions);
    const result = hunter.generatePopulation();
    this.dispatch(updatePathTable(result.reverse()));
  }

  render() {
    const {
      pokemons, pokemonPosistions, bounds, dispatch, pokemonInPath,
      directions, chromosomes, vChromosome,
    } = this.props;

    return (
      <div className="main-app">
        <div className="row">
          <div className="map-wrapper" style={{ width: 'calc(100% - 400px)' }}>
            <PokemonMap
              pokemonPosistions={pokemonPosistions} ref="pokemon-map"
              chromosome={vChromosome}
            />
          </div>
          <div className="filter-wrapper">
            <PokemonTable pokemons={pokemons} dispatch={dispatch} />
          </div>
        </div>

        <div className="row" style={{ margin: '10px' }}>
          <div className="pull-left">
            South West: {bounds.southWest.join(', ')} <br />
            North East: {bounds.northEast.join(', ')} <br />
          </div>
          <a
            className="btn btn-primary pull-right"
            href="#" onClick={() => this.getBounds(pokemonPosistions)}
          >Get bounds & Pokemon in bounds
          </a>
        </div>

        <div className="row" style={{ margin: '10px', maxHeight: '400px', overflowY: 'scroll' }}>
          <PokemonInPathTable pokemons={pokemonInPath} />
        </div>
        <div className="row" style={{ margin: '10px' }}>
          <div>
            {(() => {
              if (directions.length === 0) return null;
              return <div>Number of paths: {directions.length}</div>;
            })()}
          </div>
          <a
            className="btn btn-danger pull-right"
            style={{ marginLeft: '10px' }}
            href="#"
            onClick={() => this.hunt(pokemonInPath, directions)}
          >Run GA</a>
          <a
            className="btn btn-warning pull-right"
            href="#" onClick={() => this.getPokemonMatrix(pokemonInPath)}
          >Get paths</a>
        </div>
        <div className="row" style={{ margin: '10px' }}>
          <PathTable chromosomes={chromosomes} dispatch={dispatch} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const {
    pokemons, pokemonPosistions, bounds, pokemonInPath,
    directions, chromosomes, vChromosome,
  } = state.app;

  const filtered = pokemons.filter(f => f.show_filter === true).map(m => parseInt(m.id, 10));
  const filteredPositions = pokemonPosistions.filter(f => filtered.indexOf(f.i) > -1);

  return {
    pokemons,
    pokemonPosistions: filteredPositions,
    bounds,
    pokemonInPath,
    directions,
    chromosomes,
    vChromosome,
  };
};

export default connect(mapStateToProps)(App);
