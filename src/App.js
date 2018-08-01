import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import {DASHBOARD, HEADER, CREATE_ITEM, TRANSFER_EVENTS, ALERTS} from './utils/Routes'
import {Dashboard, CreateItem, TransferEvents, Alerts} from './screens'
import {Header} from './components'
import {init, getAccounts} from './lib/Eth'
import mprestoContract from './contracts/MPrestoContract'
import './App.css';

class App extends Component {
  state = {
    width: window.innerWidth,
    account: '',
    loading: true
  }

  componentDidMount() {
    window.onresize = () => this.setState({width: window.innerWidth})
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
            <div className={(this.state.width > 992 ? 'container' : '')}>
              <PublicRoute exact path={DASHBOARD} component={Dashboard} account={this.state.account} onError={this.onError}/>
              <PublicRoute path={CREATE_ITEM} component={CreateItem} account={this.state.account} onError={this.onError}/>
              <PublicRoute exact path={TRANSFER_EVENTS} component={TransferEvents} account={this.state.account} onError={this.onError}/>
              <PublicRoute path={ALERTS} component={Alerts} />
            </div>
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
