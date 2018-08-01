import React, { Component } from 'react';
import {CreateItem, ItemList, Nickname, TransferEvents} from '../components'
import mprestoContract from '../contracts/MPrestoContract'

export default class Dashboard extends Component {
  state = {
    items: []
  }

  componentDidMount() {
    this._fetchItems()
  }

  onCreate = () => {
    this._fetchItems()
  }

  _fetchItems = () =>
    mprestoContract
      .getItemsByOwner(this.props.account)
      .then(items => this.setState({items}))
      .catch(this.props.onError)

  render() {
    return (
      <div className="p-2">
        <div className="row mb-3">
          <div className="col-md-12">
            <CreateItem account={this.props.account} onError={this.props.onError} onCreate={this.onCreate}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ItemList account={this.props.account} items={this.state.items} onError={this.props.onError}/>
          </div>
        </div>
      </div>
    );
  }
}
