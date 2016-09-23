import React, { Component, PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import { autobind } from 'core-decorators';
import {
  updateFilter,
} from '../actions';
require('fixed-data-table/dist/fixed-data-table.css');

export class PokemonTable extends Component {
  static propTypes = {
    pokemons: PropTypes.array,
    dispatch: PropTypes.func,
  }

  constructor(comProps) {
    super(comProps);
    this.dispatch = comProps.dispatch;
  }

  @autobind
  onChangeFilter(pokemon) {
    this.dispatch(updateFilter(pokemon));
  }

  render() {
    const { pokemons } = this.props;

    return (
      <Table
        rowsCount={pokemons.length}
        rowHeight={35}
        width={400}
        height={400}
        headerHeight={40}
      >
        <Column
          header={<Cell>Id</Cell>}
          cell={({ rowIndex }) => (<Cell>{pokemons[rowIndex].id}</Cell>)}
          width={133}
        />
        <Column
          header={<Cell>Name</Cell>}
          cell={({ rowIndex }) => (<Cell>{pokemons[rowIndex].name}</Cell>)}
          width={133}
        />
        <Column
          header={<Cell>Filter</Cell>}
          cell={({ rowIndex }) => (
            <Cell>
              <input
                type="checkbox"
                value="filter"
                checked={pokemons[rowIndex].show_filter}
                onChange={() => this.onChangeFilter(pokemons[rowIndex])}
              />
            </Cell>
          )}
          width={134}
        />
      </Table>
    );
  }
}
