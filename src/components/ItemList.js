import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {TRANSFER} from '../utils/Routes'
import mprestoContract from '../contracts/MPrestoContract'

export default class ItemList extends Component {
  state = {
    items: []
  }

  componentDidMount() {
    mprestoContract.getItemsByOwner(this.props.account).then(items => this.setState({items})).catch(this.props.onError)
  }

  render() {
    if (this.state.items.length === 0) return <Empty />
    return (
      <ul className="list-group">
        {this.state.items.map((item, i) => (
          <Item key={i} item={item}/>
        ))}
      </ul>
    )
  }
}

const Empty = () => (
  <h3 className="text-light text-center">No tienes ningun objeto...</h3>
)

class Item extends Component {
  state = {
    name: '',
    quantity: ''
  }
  componentDidMount() {
    mprestoContract.getItem(this.props.item).then(result => {
      this.setState({name: result.name, quantity: result.quantity})
    }).catch(console.error)
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="d-flex justify-content-between">
          <div>
            <h5>{this.state.name}</h5>
            <small className="text-muted">Id: {this.props.item} Cantidad: {this.state.quantity}</small>
          </div>
          <Link className="btn btn-success d-flex align-items-center" to={TRANSFER.replace(':id', this.props.item)}>Prestar</Link>
        </div>
      </li>
    )
  }
}
