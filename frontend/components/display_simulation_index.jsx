import React from 'react';
import { withRouter } from 'react-router-dom';
import DisplaySimulationIndexItem from './display_simulation_index_item';

import { spaceship } from '../utils/helpers';

const displayHeader = contractsPerTrade => {
  if (contractsPerTrade === "1") {
    return (<h2>Results for {contractsPerTrade} Contract Per Trade</h2>);
  } else {
    return (<h2>Results for {contractsPerTrade} Contracts Per Trade</h2>);
  }
};

const SimulationIndex = (props) => {
  const simulations = props.result["Simulation"];

  return (
    <section id="simulation-index">
      <header>
        {displayHeader(props.match.params.contractsPerTrade)}
      </header>
      <ul className="simulation-index">
        {
          Object.keys(simulations).sort(spaceship).map(simIndex => (
            <DisplaySimulationIndexItem
              key={simIndex}
              simIndex={simIndex}
              simulation={simulations[simIndex]}
            />
          ))
        }
      </ul>
    </section>
  );
};

const DisplaySimulationIndex = withRouter(SimulationIndex);
export default DisplaySimulationIndex;
