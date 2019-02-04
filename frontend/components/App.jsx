import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

import { getResults, validateInputs } from '../utils/helpers';
import Controller from './controller';

import DisplayAnalysisIndex from './display_analysis_index';
import DisplayResultsIndex from './display_results_index';

import DisplaySimulationIndex from './display_simulation_index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      initAcctBalance: "1000.00",
      creditReceived: "250.00",
      numOfSimulations: "1",
      numOfTrades: "1",
      shortContractDelta: "0.50",
      results: {},
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
        disableAnalyze: false,
        disableView: false
      }
    }, () => { this.props.history.push('/analyze'); });
  }

  compute(e) {
    e.preventDefault();

    let params = this.state;
    let errors = validateInputs(params);

    if (errors.length === 0) {
      this.setState({
        errors: [],
        ui: {
          disableAnalyze: false,
          disableView: false
        },
        initAcctBalance: Number(params.initAcctBalance).toFixed(2).toString(),
        creditReceived: Number(params.creditReceived).toFixed(2).toString(),
        shortContractDelta: Number(params.shortContractDelta).toFixed(2).toString(),
        numOfSimulations: Number(params.numOfSimulations).toFixed(0).toString(),
        numOfTrades: Number(params.numOfTrades).toFixed(0).toString()
      }, () => {
        const results = getResults(this.state);
        this.setState({ results: results });
      });
    } else {
      this.setState({
        errors: errors,
        results: {},
        ui: {
          disableAnalyze: false,
          disableView: false
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
        disableView: false
      }
    }, () => { this.props.history.push('/view'); });
  }

  render() {
    const params = this.state;

    return (
      <div>
        <header>
          <h1>
            Options Position Sizer
          </h1>
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

        <section id="display-errors">
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
            render={() => <DisplayResultsIndex results={this.state.results} />}
          />

          <Route
            path="/view/:contractsPerTrade"
            render={(props) => {
              const cpt = props.match.params.contractsPerTrade;
              const results = this.state.results["Contracts Per Trade"];
              if (results === undefined) { return null; }
              if (results[cpt] === undefined) { return null; }
              return (<DisplaySimulationIndex result={results[cpt]}/>);
            }}
          />

          <Route
            exact
            path="/analyze"
            render={() =>
              <DisplayAnalysisIndex
                results={this.state.results["Contracts Per Trade"]}
              />
            }
          />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
