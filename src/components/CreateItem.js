import React, {Component} from 'react'

//const $ = window.$

export default class CreateItem extends Component {
  state = {
    name: '',
    quantity: '0'
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

    this.props.onClick(name, parseInt(quantity, 10))
    console.log(this.state)
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
            <button className="btn btn-primary btn-block" disabled={this.props.laoding}>Crear</button>
          </form>
        </div>
      </div>
    )
  }
}
