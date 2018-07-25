import React, { Component } from 'react';
import {CreateItem, ItemList} from './components'
import './App.css';

class App extends Component {
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
            <CreateItem />
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
