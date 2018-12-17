import React, { Component } from 'react';
import {CREATE_ITEM} from '../utils/Routes'
import {Item} from '../components'
import mprestoContract from '../contracts/MPrestoContract'

export default class Dashboard extends Component {
  state = {
    items: []
  }

  componentDidMount() {
    this._fetchItems()
  }

  createOrder = () => this.props.history.push(CREATE_ITEM)

  navigate = (to) => {
    if (to !== this.props.history.location.pathname) {
      this.props.history.push(to)
    } else {
      window.location.reload()
    }
  }

  _fetchItems = () => mprestoContract.getItemsByOwner(this.props.account)
    .then(items => this.setState({items}))
    .catch(this.props.onError)

  render() {
    return (
      <div className="p-2">
        <ItemList items={this.state.items} onRefresh={this._fetchItems} navigate={this.navigate}/>
        <button className="btn btn-primary cs-fab mr-4 mb-4" type="button" onClick={this.createOrder}>
          <i className="fal fa-plus fa-2x"></i>
        </button>
      </div>
    );
  }
}

const ItemList = ({items, onRefresh, navigate}) => {
  if (items.length === 0) return <Empty />
  return (
    <ul className="list-group list-group-flush">
      {items.map((item, i) => <Item key={i} item={item} onRefresh={onRefresh} navigate={navigate}/>)}
    </ul>
  )
}

const Empty = () => (
  <h3 className="text-center">
    No tienes ningun item...
  </h3>
)
