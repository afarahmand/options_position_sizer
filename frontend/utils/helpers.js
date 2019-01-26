const successfulTrade = shortContractDelta => (
  Math.random() > shortContractDelta
);

const getTradeGain = (creditReceived, shortContractDelta) => {
  if(successfulTrade(shortContractDelta)) {
    return creditReceived;
  } else {
    return -(500-creditReceived);
  }
};

const getSimulationResult = (
  initAcctBalance,
  creditReceived,
  shortContractDelta,
  numOfTrades,
  percPerTrade
) => {
  const sameAsZero = 1;
  let result = [Number(initAcctBalance)];

  let i = 1, tradeGain;
  while(i <= numOfTrades) {
    if (result[i - 1] > sameAsZero) {
      tradeGain = getTradeGain(creditReceived, shortContractDelta);
      result.push(result[i-1] + tradeGain * (result[i-1]*percPerTrade/100));
    } else {
      result[i] = 0;
    }

    i++;
  }

  return result;
};

const getPercPerTradeResult = (
  initAcctBalance,
  creditReceived,
  shortContractDelta,
  numOfSimulations,
  numOfTrades,
  percPerTrade
) => {
  let result = {};

  let simIndex = 1;
  while(simIndex <= numOfSimulations) {
    if (result[simIndex] === undefined) {
      result[simIndex] = {};
    }

    result[simIndex] = getSimulationResult(
      initAcctBalance,
      creditReceived,
      shortContractDelta,
      numOfTrades,
      percPerTrade
    );

    simIndex++;
  }

  return result;
};

export const getResults = ({
  initAcctBalance,
  creditReceived,
  shortContractDelta,
  increment,
  numOfSimulations,
  numOfTrades
}) => {
  let results = {};

  let step = Number(increment);
  let percPerTrade = step;
  while(percPerTrade <= 100) {
    if (results[percPerTrade.toString()] === undefined) {
      results[percPerTrade.toString()] = {};
    }

    results[percPerTrade.toString()] = getPercPerTradeResult(
      initAcctBalance,
      creditReceived,
      shortContractDelta,
      numOfSimulations,
      numOfTrades,
      percPerTrade
    );

    percPerTrade+=step;
  }

  return results;
};

export const validateInputs = (params) => {
  let errors = [];

  if (isNaN(params.initAcctBalance)) {
    errors.push("initAcctBalance is not a number");
  }
  else if (Number(params.initAcctBalance).toFixed(2) < 10) {
    errors.push("initAcctBalance is too small");
  }

  if (isNaN(params.creditReceived)) {
    errors.push("creditReceived is not a number");
  } else if (Number(params.creditReceived) < 1.0) {
    errors.push("creditReceived is too low");
  } else if (Number(params.creditReceived) > 499.0) {
    errors.push("creditReceived is too high");
  }

  if (isNaN(params.shortContractDelta)) {
    errors.push("shortContractDelta is not a number");
  } else if (Number(params.shortContractDelta) < 0.0) {
    errors.push("shortContractDelta is too low");
  } else if (Number(params.shortContractDelta) > 1.0) {
    errors.push("shortContractDelta is too high");
  }

  if (isNaN(params.increment)) {
    errors.push("increment is not a number");
  } else if (Number(params.increment) < 0.1) {
    errors.push("increment is too low");
  } else if (Number(params.increment) > 100.0) {
    errors.push("increment is too high");
  }

  if (isNaN(params.numOfSimulations)) {
    errors.push("invalid numOfSimulations");
  } else if (Number(params.numOfSimulations).toFixed(0) < 1) {
    errors.push("numOfSimulations is too low");
  }

  if (isNaN(params.numOfTrades)) {
    errors.push("invalid numOfTrades");
  } else if (Number(params.numOfTrades).toFixed(0) < 1) {
    errors.push("numOfTrades is too low");
  }

  return errors;
};
