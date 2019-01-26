import React from 'react';

const DisplayResults = ({ results }) => {
  if (results === undefined) {
    return null;
  }

  console.log("Results: ", results);

  return (
    <section id="display-results">
      <header>
        <h2>Simulation Results of N contract/trade</h2>
      </header>

      VIEW

      <ul>
      </ul>
    </section>
  );
};

export default DisplayResults;
