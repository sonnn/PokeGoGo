import React, { Component, PropTypes } from 'react';

export class PokemonInPathTable extends Component {
  static propTypes = {
    pokemons: PropTypes.array,
    dispatch: PropTypes.func,
  }

  constructor(comProps) {
    super(comProps);
    this.dispatch = comProps.dispatch;
  }

  render() {
    const { pokemons } = this.props;

    if (pokemons.length === 0) return null;

    const style = {
      width: '100%',
    };

    return (
      <table className="table" style={style}>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>LAT</th>
            <th>LNG</th>
            <th>TIME</th>
          </tr>
        </thead>
        <tbody>
          {(() => (
            pokemons.map(pk => (
              <tr>
                <td>{pk.i}</td>
                <td>{pk.name}</td>
                <td>{pk.a}</td>
                <td>{pk.o}</td>
                <td>{new Date(pk.t * 1000).toString()}</td>
              </tr>
            ))
          ))()}
        </tbody>
      </table>
    );
  }
}
