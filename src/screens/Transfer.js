import React, { Component } from 'react';
import {DASHBOARD} from '../utils/Routes'
import {Link} from 'react-router-dom'
import mprestoContract from '../contracts/MPrestoContract'

export default class Transfer extends Component {
  state = {
    address: '',
    name: '',
    quantity: '',
    hash: '',
    loading: false
  }

  componentDidMount() {
    mprestoContract.getItem(this.props.match.params.id).then(item => {
      this.setState({name: item.name, quantity: item.quantity})
    }).catch(this.props.onError)
  }

  onAddress = (e) => {
    this.setState({address: e.target.value})
  }

  transfer = (e) => {
    e.preventDefault()
    let address = this.state.address.trim()

    if (address.length === 0) {
      return
    }

    this.setState({loading: true})
    mprestoContract.transfer(address, this.props.match.params.id).then(result => {
      console.log(result)
      this.setState({loading: false, hash: result.transactionHash})
    }).catch(e => {
      this.setState({loading: false})
      this.props.onError(e)
    })
  }

  disableButton = () => (this.state.loading || this.state.address.trim().length === 0)

  render() {
    return (
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-12">
            <h1 className="text-light">Transfer</h1>
            <div className="card">
              <div className="card-body">
                <h3>Vas a transferir "{this.state.name}"</h3>
                <form onSubmit={this.transfer}>
                  <div className="form-group">
                    <label htmlFor="address">Direccion</label>
                    <input id="address" className="form-control" onChange={this.onAddress} value={this.state.address}/>
                  </div>
                  <button className="btn btn-primary btn-block" disabled={this.disableButton()}>Transferir</button>
                  <Link className="btn btn-link btn-block" to={DASHBOARD}>Volver</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.state.hash && this.state.hash.length !== 0 ? <Hash hash={this.state.hash} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

const Hash = ({hash}) => (
  <div className="card">
    <div className="card-body">
      Transaccion: <a href={"https://rinkeby.etherscan.io/tx/" + hash} target="_blank">{hash}</a>
    </div>
  </div>
)
