import React, {Component} from 'react'
import mprestoContract from '../contracts/MPrestoContract'

//const $ = window.$

export default class CreateItem extends Component {
  state = {
    name: '',
    quantity: '0',
    loading: false
  }

  onChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  submit = (e) => {
    e.preventDefault()
    let {name, quantity} = this.state

    if (name.trim().length === 0 || isNaN(quantity)) {
      console.error('campos invalidos')
      return
    }

    this.setState({loading: true})
    mprestoContract.createItem(name, parseInt(quantity, 10)).then(r => {
      console.log('result', r)
      this.setState({loading: false})
    }).catch(e => {
      console.error(e)
      this.setState({loading: false})
    })
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4>Crear nuevo objeto</h4>
          <form onSubmit={this.submit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input id="name" className="form-control" onChange={this.onChange} value={this.state.name} required/>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">cantidad</label>
              <input id="quantity" className="form-control" onChange={this.onChange} value={this.state.quantity} required/>
            </div>
            <button className="btn btn-primary btn-block" disabled={this.state.loading}>Crear</button>
          </form>
        </div>
      </div>
    )
  }
}
