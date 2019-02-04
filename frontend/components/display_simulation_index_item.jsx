import React from 'react';
import { spaceship } from '../utils/helpers';

const DisplaySimulationIndexItem = ({ simIndex, simulation }) => {
  return (
    <li>
      <header>
        <h3>Simulation {simIndex}</h3>
      </header>
      <ul className="trade-index">
        {
          simulation["Trade"].map((acctBalance, idx) => (
            <li key={idx}>{idx}: ${acctBalance}</li>
          ))
        }
      </ul>
    </li>
  );
};

export default DisplaySimulationIndexItem;
