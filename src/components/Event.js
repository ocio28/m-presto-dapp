import React, {Component} from 'react'
import mprestoContract from '../contracts/MPrestoContract'
import {hexToUtf8} from '../lib/Eth'

export default class Event extends Component {
  state = {
    name: '',
    quantity: '',
    owner: '',
    nickname: '',
    show: false
  }

  componentDidMount() {
    mprestoContract.getItem(this.props.event.itemId).then(result => {
      console.log(result)
      this.setState({
        name: result['0'],
        quantity: result['1'],
        owner: result['2'],
        nickname: hexToUtf8(result['3'])
      })
    }).catch(console.error)
  }

  _toggle = (e) => {
    e.preventDefault()
    this.setState({show: !this.state.show})
  }

  render() {
    return (
      <li className="list-group-item cs-pointer" onClick={this._toggle}>
        <div className="list-group-item-action">
          <div className="d-flex justify-content-between">
            <h4 className="mb-1">{this.state.name}</h4>
            <small className="text-muted">{this.props.event.itemId}</small>
          </div>
          <p className="mb-1">Prestado a <strong>"{this.state.nickname}"</strong></p>
          <small className="text-muted">Cantidad: {this.state.quantity}</small>
        </div>
        {this.state.show ? <Address address={this.state.owner} /> : null}
      </li>
    )
  }
}

const Address = ({address}) => (
  <div>
    Direccion: {address}
  </div>
)
