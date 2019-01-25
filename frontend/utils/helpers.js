export const validateInputs = (params) => {
  let errors = [];

  if (isNaN(params.accountSize)) {
    errors.push("accountSize is not a number");
  }
  else if (Number(params.accountSize).toFixed(2) < 10) {
    errors.push("accountSize is too small");
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

  if (isNaN(params.simulationIncrement)) {
    errors.push("simulationIncrement is not a number");
  } else if (Number(params.simulationIncrement) < 0.1) {
    errors.push("simulationIncrement is too low");
  } else if (Number(params.simulationIncrement) > 100.0) {
    errors.push("simulationIncrement is too high");
  }

  if (isNaN(params.numberOfSimulations)) {
    errors.push("invalid numberOfSimulations");
  } else if (Number(params.numberOfSimulations).toFixed(0) < 1) {
    errors.push("numberOfSimulations is too low");
  }

  if (isNaN(params.numberOfTrades)) {
    errors.push("invalid numberOfTrades");
  } else if (Number(params.numberOfTrades).toFixed(0) < 1) {
    errors.push("numberOfTrades is too low");
  }

  console.log("ValErrors: ", errors);

  return errors;
};
