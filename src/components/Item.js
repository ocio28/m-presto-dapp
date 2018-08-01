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
      <li className="list-group-item pr-0 pl-0">
        <div className="d-flex justify-content-between">
          <div>
            <h4 className="mb-1">{this.state.name}</h4>
            <p className="mb-1">Cantidad: {this.state.quantity}</p>
            <small className="text-muted">id: {this.props.item}</small>
          </div>
          <Link className="btn btn-success d-flex align-items-center" to={TRANSFER.replace(':id', this.props.item)}>Prestar</Link>
        </div>
      </li>
    )
  }
}
