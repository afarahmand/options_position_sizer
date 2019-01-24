import React from 'react';

const SimulationResult = (
  simulationId,
  initBalance,
  numOfTrades,
  percBalancePerTrade,
  percSuccessPerTrade
) => {
  let acctBal = [initBalance];

  let i = 1;
  while (i <= numOfTrades) {
    acctBal.push(acctBal[i-1] + 1);
    i++;
  }

  return (
    <li>
      <header>
        <h3>Simulation X</h3>
      </header>

      <ul>
      </ul>
    </li>
  );
};

export default SimulationResult;
