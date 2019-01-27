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
          Initial Account Balance [$]
          <input
            type="text"
            value={params.initAcctBalance}
            onChange={update('initAcctBalance')}
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
          # of Simulations
          <input
            type="text"
            value={params.numOfSimulations}
            onChange={update('numOfSimulations')}
          >
          </input>
        </li>

        <li>
          # of Trades
          <input
            type="text"
            value={params.numOfTrades}
            onChange={update('numOfTrades')}
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
