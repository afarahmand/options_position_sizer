import React from 'react';

const renderButton = (onClickFunc, text, disableButton = false) => {
  if (disableButton) {
    return (<button disabled onClick={onClickFunc}>{text}</button>);
  } else {
    return (<button onClick={onClickFunc}>{text}</button>);
  }
};

const Controller = ({
  params, disableAnalyze, disableView, analyze, compute, view, update
}) => {
  return (
    <form>
      <ul>
        <li>
          Initial Account Size [$]
          <input
            type="text"
            value={params.accountSize}
            onChange={update('accountSize')}
          >
          </input>
        </li>

        <li>
          Credit Received [$]
          <input
            type="text"
            value={params.creditReceived}
            onChange={update('creditReceived')}
          >
          </input>
        </li>


        <li>
          Short Contract Delta
          <input
            type="text"
            value={params.shortContractDelta}
            onChange={update('shortContractDelta')}
          >
          </input>
        </li>

        <li>
          Simulation Increment [%]
          <input
            type="text"
            value={params.simulationIncrement}
            onChange={update('simulationIncrement')}
          >
          </input>
        </li>

        <li>
          # of Simulations
          <input
            type="text"
            value={params.numberOfSimulations}
            onChange={update('numberOfSimulations')}
          >
          </input>
        </li>

        <li>
          # of Trades
          <input
            type="text"
            value={params.numberOfTrades}
            onChange={update('numberOfTrades')}
          >
          </input>
        </li>

        <li>
          {renderButton(compute, "Compute", false)}
          {renderButton(view, "View", disableView)}
          {renderButton(analyze, "Analyze", disableAnalyze)}
        </li>
      </ul>
    </form>
  );
};

export default Controller;
