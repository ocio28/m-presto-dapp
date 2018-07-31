import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import {DASHBOARD, TRANSFER, HEADER} from './utils/Routes'
import Dashboard from './screens/Dashboard'
import Transfer from './screens/Transfer'
import Header from './components/Header'
import {init, getAccounts} from './lib/Eth'
import mprestoContract from './contracts/MPrestoContract'
import './App.css';

class App extends Component {
  state = {
    account: '',
    loading: true
  }

  componentDidMount() {
    if (init()) {
      mprestoContract.init().then(getAccounts).then(accounts => {
        if (accounts.length === 0) return Promise.reject('No hay cuentas')
        this.setState({account: accounts[0], loading: false})
      }).catch(this.onError)
    } else {
      console.log('no provider, install metamask')
    }
  }

  onError = (e) => {
    console.error(e)
    this.setState({loading: false})
  }

  render() {
    if (this.state.loading) return null
    return (
      <Router>
        <div>
          <PublicRoute path={HEADER} component={Header} account={this.state.account} onError={this.onError}/>
          <div className="cs-header-margin">
            <PublicRoute exact path={DASHBOARD} component={Dashboard} account={this.state.account} onError={this.onError}/>
            <PublicRoute path={TRANSFER} component={Transfer} account={this.state.account} onError={this.onError}/>
          </div>
        </div>
      </Router>
    );
  }
}

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} {...rest}/>}/>
);

export default App;
