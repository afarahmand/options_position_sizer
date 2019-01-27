const isOdd = num => ( num & 1 );

const getContractsPerTradeStats = (
  contractsPerTrade, numOfSimulations, numOfTrades
  ) => {
  let result = { average: null, median: null, min: null, max: null };
  let finalAcctBalances = [];

  Object.keys(contractsPerTrade).forEach(simIndex => {
    finalAcctBalances.push(contractsPerTrade[simIndex]["Trade"][numOfTrades]);
  });

  finalAcctBalances = finalAcctBalances.sort(spaceship);

  result.min = finalAcctBalances[0];
  result.max = finalAcctBalances[numOfSimulations - 1];

  // Average
  let sum = 0;
  sum = finalAcctBalances.reduce(function(total, num) { return total+num; });
  result.average = sum/numOfTrades;

  // Median
  if (isOdd(finalAcctBalances.length)) {
    result.median = finalAcctBalances[Math.floor(finalAcctBalances.length/2)];
  } else {
    result.median = finalAcctBalances[finalAcctBalances.length/2];
  }

  return result;
};

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

  return { "Trade": result };
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
  let stats;

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

  stats = getContractsPerTradeStats(result, numOfSimulations, numOfTrades);

  return {
    "Final Account Balance": {
      "average": stats.average,
      "median": stats.median,
      "max": stats.max,
      "min": stats.min
    },
    "Simulation": result
  };
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

const spaceship = function (a, b) {
  a = Number(a);
  b = Number(b);
  if (a < b) return -1;
  if (a === b) return 0;
  if (a > b) return  1;
};
