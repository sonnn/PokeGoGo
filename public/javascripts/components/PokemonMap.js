import React, { PropTypes, Component } from 'react';
import { Map, Marker, TileLayer, Polyline } from 'react-leaflet';
import L from 'leaflet';
import _ from 'lodash';
require('leaflet/dist/leaflet.css');

function createPokemonIcon(id) {
  const className = `pki pkiAll n${parseInt(id, 10)}`;
  const myIcon = L.divIcon({
    html: `<span>
      <i class="${className}"></i>
    </span>`,
    iconSize: [32, 32],
    className: 'poke-icon',
  });
  return myIcon;
}

export class PokemonMap extends Component {
  static propTypes = {
    startPos: PropTypes.array,
    pokemonPosistions: PropTypes.array,
    chromosome: PropTypes.any,
  }

  static defaultProps = {
    startPos: [1.387073, 103.728024],
    pokemonPosistions: [],
  }

  constructor(comprops) {
    super(comprops);

    this.lmap = null;
  }

  componentDidMount() {
    this.lmap = this.refs['pokemon-map'];
  }

  createPolyline(chromosome) {
    if (_.isUndefined(chromosome) || _.isNull(chromosome)) return null;
    const steps = chromosome.getAllSteps();
    const latlngList = steps.reduce((result, current) => {
      const { start_location, end_location } = current;
      return result.concat([
        [start_location.lat, start_location.lng],
        [end_location.lat, end_location.lng],
      ]);
    }, []);

    return <Polyline positions={latlngList} />;
  }

  render() {
    const { startPos, pokemonPosistions, chromosome } = this.props;

    return (
      <Map center={startPos} zoom={15} ref="pokemon-map" id="pokemon-map">
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution=""
        />
        {(
          () => (
            pokemonPosistions.map(pokemon => (
              <Marker
                position={[pokemon.a, pokemon.o]}
                icon={createPokemonIcon(pokemon.i)}
              />
            ))
          )
        )()}
        {this.createPolyline(chromosome)}
      </Map>
    );
  }
}
