import React, { Component } from 'react';
import {CreateItem, ItemList} from './components'
import {init} from './lib/Eth'
import MPrestoContract from './contracts/MPrestoContract'
import './App.css';

class App extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    if (init()) {
      this._mpresto = new MPrestoContract()
      this._mpresto.init()
    } else {
      console.log('no provider')
    }
  }

  createItem = (name, quantity) => {
    this.setState({loading: true})
    this._mpresto.createItem(name, quantity).then(r => {
      console.log('result', r)
      this.setState({loading: false})
    }).catch(e => {
      console.error(e)
      this.setState({loading: false})
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-3 text-light">MPresto!</h1>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <CreateItem onClick={this.createItem} loading={this.state.loading}/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <ItemList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
