import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
require('leaflet/dist/leaflet.css');

const position = [1.387073, 103.728024];

const PokemonMap = () => (
  <Map center={position} zoom={13}>
    <TileLayer
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      attribution=""
    />
    <Marker position={position}>
      <Popup>
        <span>A pretty CSS3 popup.<br />Easily customizable.</span>
      </Popup>
    </Marker>
  </Map>
);

export {
  PokemonMap,
};
