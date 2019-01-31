import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

import { getResults, validateInputs } from '../utils/helpers';
import Controller from './controller';

// import DisplayAnalysis from './display_analysis';
import DisplayResultsIndex from './display_results_index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      initAcctBalance: "1000.00",
      creditReceived: "250.00",
      numOfSimulations: "3",
      numOfTrades: "5",
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
        disableAnalyze: true,
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
        ui: {
          disableAnalyze: this.props.location.pathname === "/analyze",
          disableView: this.props.location.pathname === "/view"
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
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
