import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {TRANSFER} from '../utils/Routes'
import mprestoContract from '../contracts/MPrestoContract'

export default class Item extends Component {
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
      <Link className="list-group-item list-group-item-action pr-0 pl-0" to={TRANSFER.replace(':id', this.props.item)}>
        <div>
          <div className="d-flex justify-content-between">
            <h4 className="mb-1">{this.state.name}</h4>
            <small className="text-muted">{this.props.item}</small>
          </div>
          <p className="mb-1">Cantidad: {this.state.quantity}</p>
        </div>
      </Link>
    )
  }
}
