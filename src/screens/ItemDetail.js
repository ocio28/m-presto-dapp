import React, { Component } from 'react';
//import { connect } from 'react-redux'
import mprestoContract from '../contracts/MPrestoContract'
import {hexToUtf8} from '../lib/Eth'

class ItemDetail extends Component {
  state = {
    name: '',
    quantity: '',
    owner: '',
    owner_name: ''
  }

  componentDidMount() {
    let id = this.props.match.params.id
    mprestoContract.getItem(id).then(result => {
      console.log(result)
      this.setState({name: result['0'], quantity: result['1'],
        owner: result['2'], owner_name: hexToUtf8(result['3'])})
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

  goBack = () => this.props.history.goBack()

  render() {
    return (
      <div className="p-2">
        <h4>{this.state.name}</h4>
        <p>Cantidad: {this.state.quantity}</p>
        <p>Lo tiene: {this.state.owner_name} ({this.state.owner})</p>
        <TransferForm onSubmit={this.transfer} goBack={this.goBack}/>
      </div>
    );
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
      <form onSubmit={this._submit} className="border-top border-light">
        <h5>Prestar</h5>
        <div className="form-group">
          <input type="text" className="form-control" value={this.state.address} onChange={this._address}
            placeholder="Direccion del destinatario" aria-label="Destinatario" disabled={this.props.disabled}/>
        </div>
        <button className="btn btn-primary btn-block" disabled={this._disabled()}>Prestar</button>
        <button className="btn btn-light btn-block" type="button" onClick={this.props.goBack}>Volver</button>
      </form>
    )
  }
}

export default ItemDetail
