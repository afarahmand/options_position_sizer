import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

import { validateInputs } from '../utils/helpers';
import Controller from './controller';

// import AnalysisResults from './analysis_results';
import SimulationResults from './simulation_results';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      accountSize: "1000.00",
      creditReceived: "1.00",
      numberOfSimulations: "3",
      numberOfTrades: "10",
      shortContractDelta: "0.20",
      simulationIncrement: "1.00",
      simulationResults: {},
      ui: {
        disableAnalyze: true,
        disableView: true
      }
    };

    this.analyze = this.analyze.bind(this);
    this.compute = this.compute.bind(this);
    this.view = this.view.bind(this);
    this.update = this.update.bind(this);
  }

  analyze () {
    this.setState({
      ui: {
        disableAnalyze: true,
        disableView: false
      }
    }, () => { this.props.history.push('/analyze'); });
  }

  compute(e) {
    e.preventDefault();

    // Validate inputs
    let params = this.state;
    let errors = validateInputs(params);

    if (errors.length === 0) {
      console.log("Errors App: ", errors);
      this.setState({
        ui: {
          disableAnalyze: false,
          disableView: true
        },
        accountSize: Number(params.accountSize).toFixed(2).toString(),
        creditReceived: Number(params.creditReceived).toFixed(2).toString(),
        numberOfSimulations: Number(params.numberOfSimulations).toFixed(0).toString(),
        numberOfTrades: Number(params.numberOfTrades).toFixed(0).toString(),
        shortContractDelta: Number(params.shortContractDelta).toFixed(2).toString(),
        simulationIncrement: Number(params.simulationIncrement).toFixed(2).toString()
      }, () => {
        if (this.props.history.location.pathname !== '/view') {
          this.props.history.push('/view');
        }
      });
    } else {
      this.setState({
        errors: errors,
        ui: {
          disableAnalyze: true,
          disableView: true
        }
      });
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  view () {
    this.setState({
      ui: {
        disableAnalyze: false,
        disableView: true
      }
    }, () => { this.props.history.push('/view'); });
  }

  render() {
    const params = this.state;

    return (
      <div>
        <header>
          <Controller
            params={params}
            disableAnalyze={this.state.ui.disableAnalyze}
            disableView={this.state.ui.disableView}

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
                <li key={idx}>{error}</li>
              ))
            }
          </ul>
        </section>

        <Switch>
          <Route
            exact
            path="/view"
            component={SimulationResults}
            simulationResults={this.state.simulationResults}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
