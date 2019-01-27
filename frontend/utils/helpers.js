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
  contractsPerTrade
  ) => {
  const sameAsZero = 1;
  let result = [Number(initAcctBalance)];

  let i = 1, tradeGain;
  while(i <= numOfTrades) {
    if (result[i-1] > sameAsZero) {
      tradeGain = getTradeGain(creditReceived, shortContractDelta);
      result.push(result[i-1] + (tradeGain * contractsPerTrade));
    } else {
      result[i] = result[i-1];
    }

    i++;
  }

  return result;
};

const getContractsPerTradeResult = (
  initAcctBalance,
  creditReceived,
  shortContractDelta,
  numOfSimulations,
  numOfTrades,
  contractsPerTrade
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
      contractsPerTrade
    );

    simIndex++;
  }

  return result;
};

export const getResults = ({
  initAcctBalance,
  creditReceived,
  shortContractDelta,
  numOfSimulations,
  numOfTrades
  }) => {
  let results = {};

  let contractsPerTrade = 1;
  while(contractsPerTrade <= 10) {
    if (results[contractsPerTrade.toString()] === undefined) {
      results[contractsPerTrade.toString()] = {};
    }

    results[contractsPerTrade.toString()] = getContractsPerTradeResult(
      initAcctBalance,
      creditReceived,
      shortContractDelta,
      numOfSimulations,
      numOfTrades,
      contractsPerTrade
    );

    contractsPerTrade++;
  }

  return { "Contracts Per Trade": results };
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
