import React from 'react';
import { Link } from 'react-router-dom';
import DisplayResult from './display_result.jsx';
import DisplayResultsIndexItemSummary
  from './display_results_index_item_summary';

import { spaceship } from '../utils/helpers';

const DisplayResultsIndex = ({ results }) => {
  if (Object.keys(results).length === 0) {
    return null;
  }

  return (
    <section className="index results-index">
      <header>
        <h2>Results for Different Contracts Per Trade</h2>
      </header>

      <ul>
        {
          Object.keys(results["Contracts Per Trade"])
          .sort(spaceship)
          .map((contractsPerTrade, idx) => (
            <DisplayResultsIndexItemSummary
              key={contractsPerTrade}
              contractsPerTrade={contractsPerTrade}
            />
          ))
        }
      </ul>
    </section>
  );
};

export default DisplayResultsIndex;
