import React, { Component } from 'react';
import {CreateItem, ItemList} from './components'
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
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-3 text-light">MPresto!</h1>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <CreateItem account={this.state.account} onError={this.onError}/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <ItemList account={this.state.account} onError={this.onError}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
