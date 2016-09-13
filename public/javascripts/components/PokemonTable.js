import React, { Component, PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
require('fixed-data-table/dist/fixed-data-table.css');

export class PokemonTable extends Component {
  static propTypes = {
    pokemons: PropTypes.array,
  }

  render() {
    const { pokemons } = this.props;

    return (
      <Table
        rowsCount={pokemons.length}
        rowHeight={35}
        width={300}
        height={300}
        headerHeight={40}
      >
        <Column
          header={<Cell>Id</Cell>}
          cell={({ rowIndex }) => (<Cell>{pokemons[rowIndex].id}</Cell>)}
          width={100}
        />
        <Column
          header={<Cell>Name</Cell>}
          cell={({ rowIndex }) => (<Cell>{pokemons[rowIndex].name}</Cell>)}
          width={100}
        />
        <Column
          header={<Cell>Filter</Cell>}
          cell={({ rowIndex }) => (
            <Cell>
              <input type="checkbox" value="filter" checked={!pokemons[rowIndex].show_filter} />
            </Cell>
          )}
          width={100}
        />
      </Table>
    );
  }
}
