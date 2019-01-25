import React from 'react';
import SimulationResult from './simulation_result';

const SimulationResults = ({ simulationResults }) => {
  if (simulationResults === {}) {
    return null;
  }

  return (
    <section id="simulation-results">
      <header>
        <h2>Simulation Results of N contract/trade</h2>
      </header>

      <ul>
      </ul>
    </section>
  );
};

export default SimulationResults;
