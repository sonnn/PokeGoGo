import React, { Component, PropTypes } from 'react';
import { visualise } from '../actions';

export class PathTable extends Component {
  static propTypes = {
    chromosomes: PropTypes.array,
    dispatch: PropTypes.func,
  }

  constructor(comProps) {
    super(comProps);
    this.dispatch = comProps.dispatch;
  }

  visualiseChromosome(chromosome) {
    this.dispatch(visualise(chromosome));
  }

  render() {
    const { chromosomes } = this.props;

    if (chromosomes.length === 0) return null;

    return (
      <table className="table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>COST</th>
            <th>PATH</th>
          </tr>
        </thead>
        <tbody>
          {(() => (
            chromosomes.map(ch => (
              <tr onClick={() => this.visualiseChromosome(ch)}>
                <td>{ch.cost}</td>
                <td>{(() => {
                  const { sequence } = ch;
                  const text = sequence.map(s => `${s.name} (${s.a}, ${s.o})`).join(' => ');
                  return text;
                })()}</td>
              </tr>
            ))
          ))()}
        </tbody>
      </table>
    );
  }
}
