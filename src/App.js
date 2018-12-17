import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import {DASHBOARD, HEADER, CREATE_ITEM, TRANSFER_EVENTS, ALERTS, PROFILE,
  ITEM} from './utils/Routes'
import {Dashboard, CreateItem, TransferEvents, Alerts, Profile, ItemDetail} from './screens'
import {Header, Loading} from './components'
import {init, getAccounts} from './lib/Eth'
import mprestoContract from './contracts/MPrestoContract'
import './App.css';

class App extends Component {
  state = {
    width: window.innerWidth,
    account: '',
    loading: true,
    web3: false
  }

  componentDidMount() {
    window.onresize = () => this.setState({width: window.innerWidth})
    init().then(mprestoContract.init).then(getAccounts).then(this.onSuccess).catch(this.onError)
  }

  onSuccess = (accounts) => {
    if (accounts.length === 0) return Promise.reject('No hay cuentas')
    this.setState({account: accounts[0], loading: false, web3: true})
  }

  onError = (e) => {
    console.error(e)
    this.setState({loading: false})
  }

  render() {
    if (this.state.loading) return <Loading />
    if (!this.state.web3) return <NoWeb3 />
    return (
      <Router>
        <div>
          <PublicRoute path={HEADER} component={Header} account={this.state.account} onError={this.onError}/>
          <div className="cs-header-margin">
            <div className={(this.state.width > 992 ? 'container' : '')}>
              <PublicRoute exact path={DASHBOARD} component={Dashboard} account={this.state.account} onError={this.onError}/>
              <PublicRoute path={ITEM} component={ItemDetail} />
              <PublicRoute path={CREATE_ITEM} component={CreateItem} account={this.state.account} onError={this.onError}/>
              <PublicRoute exact path={TRANSFER_EVENTS} component={TransferEvents} account={this.state.account} onError={this.onError}/>
              <PublicRoute path={PROFILE} component={Profile} account={this.state.account} />
              <PublicRoute path={ALERTS} component={Alerts} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const NoWeb3 = () => (
  <div className="container text-center mt-3">
    <div className="card">
      <div className="card-body">
        MPresto requiere <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Metamask (Escritorio) </a>
        o <a href="https://www.cipherbrowser.com/" target="_blank" rel="noopener noreferrer">Cipherbrowser (Celular)</a>
        <button className="btn btn-primary btn-block mt-3" type="button" onClick={() => window.location.reload()}>Recargar</button>
      </div>
    </div>
  </div>
)

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} {...rest}/>}/>
);

export default App;
