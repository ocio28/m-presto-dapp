import React, { Component } from 'react';
import {CreateItem, ItemList} from '../components'

export default class Dashboard extends Component {
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
            <CreateItem account={this.props.account} onError={this.props.onError}/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <ItemList account={this.props.account} onError={this.props.onError}/>
          </div>
        </div>
      </div>
    );
  }
}
