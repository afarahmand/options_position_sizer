import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { validateInputs } from '../utils/helpers';

import Controller from './controller';

// import AnalysisResults from './analysis_results';
import SimulationResults from './simulation_results';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      simulationParams: {
        accountSize: "1000.00",
        creditReceived: "1.00",
        numberOfSimulations: "3",
        numberOfTrades: "10",
        shortContractDelta: "0.20",
        simulationIncrement: "1.00"
      },
      simulationResults: {},
      ui: {
        disableButtons: true
      }
    };

    this.compute = this.compute.bind(this);
    this.update = this.update.bind(this);
  }

  compute(e){
    e.preventDefault();

    // Validate inputs
    let params = this.state.simulationParams;
    let errors = validateInputs(params);

    if (errors === []) {
      this.setState({
        ui: { enableButtons: true },
        simulationParams: {
          accountSize: Number(params.accountSize).toFixed(2).toString(),
          creditReceived: Number(params.creditReceived).toFixed(2).toString(),
          numberOfSimulations: Number(params.numberOfSimulations).toFixed(0).toString(),
          numberOfTrades: Number(params.numberOfTrades).toFixed(0).toString(),
          shortContractDelta: Number(params.shortContractDelta).toFixed(2).toString(),
          simulationIncrement: Number(params.simulationIncrement).toFixed(2).toString()
        }
      });
    } else {
      this.setState({ errors: errors });
    }
  }

  update(field) {
    return e => this.setState({
      simulationParams: {
        [field]: e.currentTarget.value
      }
    });
  }

  render() {
    return (
      <div>
        <header>
          <Controller
            params={this.state.simulationParams}
            disableButtons={this.state.ui.disableButtons}

            analyze={this.analyze}
            compute={this.compute}
            update={this.update}
            view={this.view}
          />
        </header>

        <section id="error-display">
          <ul>
            {
              this.state.errors.map((error, idx) => (
                <li key={idx}>error</li>
              ))
            }
          </ul>
        </section>

        <Switch>
          <Route
            exact
            path="/"
            component={SimulationResults}
            simulationResults={this.state.simulationResults}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
