import React from 'react';
import { Link } from 'react-router-dom';
import { spaceship } from '../utils/helpers';

const displayHeader = contractsPerTrade => {
  if (contractsPerTrade === "1") {
    return (<h3>{contractsPerTrade} Contract Per Trade</h3>);
  } else {
    return (<h3>{contractsPerTrade} Contracts Per Trade</h3>);
  }
};

const DisplayAnalysisIndex = ({ results }) => {
  if (results === undefined) {
    return null;
  }

  let stats = {};
  Object.keys(results).forEach(contractsPerTrade => {
    stats[contractsPerTrade] = results[contractsPerTrade]["Final Account Balance"];
  });

  return (
    <section className="index analysis-index">
      <h2>Analysis Index</h2>
      <ul>
        {
          Object.keys(stats).sort(spaceship).map((contractsPerTrade, idx) => (
            <li key={idx}>
              <Link to={`/view/${contractsPerTrade}`}>
                {displayHeader(contractsPerTrade)}
                <ul className="stats">
                  <li>Average: {stats[contractsPerTrade].average}</li>
                  <li>Median: {stats[contractsPerTrade].median}</li>
                  <li>Max: {stats[contractsPerTrade].max}</li>
                  <li>Min: {stats[contractsPerTrade].min}</li>
                </ul>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  );
};

export default DisplayAnalysisIndex;
