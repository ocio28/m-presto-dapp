import React, {Component} from 'react'
import mprestoContract from '../contracts/MPrestoContract'

export default class Item extends Component {
  state = {
    name: '',
    quantity: '',
    show: false,
    loading: false
  }

  componentDidMount() {
    mprestoContract.getItem(this.props.item).then(result => {
      this.setState({name: result['0'], quantity: result['1']})
    }).catch(console.error)
  }

  transfer = (address) => {
    this.setState({loading: true})
    mprestoContract.transfer(address, this.props.item).then(result => {
      console.log(result)
      this.setState({loading: false})
      this.props.onRefresh()
    }).catch(e => {
      this.setState({loading: false})
      this.props.onError(e)
    })
  }

  _toggle = (e) => {
    e.preventDefault()
    this.setState({show: !this.state.show})
  }

  render() {
    return (
      <li className="list-group-item pr-0 pl-0">
        <a href="" className="list-group-item-action" onClick={this._toggle} disabled={this.state.loading}>
          <div className="d-flex justify-content-between">
            <h4 className="mb-1">{this.state.name}</h4>
            <small className="text-muted">{this.props.item}</small>
          </div>
          <p className="mb-1">Cantidad: {this.state.quantity}</p>
        </a>
        {this.state.show ? <TransferForm onSubmit={this.transfer} disabled={this.state.loading}/> : null}
      </li>
    )
  }
}

class TransferForm extends Component {
  state = {
    address: ''
  }

  _address = (e) => this.setState({address: e.target.value})

  _submit = () => this.props.onSubmit(this.state.address.trim())

  _disabled = () => this.state.address.length === 0 || this.props.disabled

  render() {
    return (
      <div className="input-group input-group-sm">
        <input type="text" className="form-control"
          value={this.state.address} onChange={this._address}
          placeholder="Direccion del destinatario" aria-label="Destinatario" disabled={this.props.disabled}/>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary"
            type="button" onClick={this._submit} disabled={this._disabled()}>Prestar</button>
        </div>
      </div>
    )
  }
}
