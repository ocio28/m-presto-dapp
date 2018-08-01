import React, {Component} from 'react'
import mprestoContract from '../contracts/MPrestoContract'

//const $ = window.$

const initialState = {
  name: '',
  quantity: '0',
  loading: false
}

export default class CreateItem extends Component {
  state = {...initialState}

  submit = (e) => {
    e.preventDefault()
    let {name, quantity} = this.state
    this.setState({loading: true})
    mprestoContract.createItem(name, parseInt(quantity, 10)).then(r => {
      console.log('result', r)
      this.setState({...initialState})
    }).then(this.props.onCreate).catch(e => {
      console.error(e)
      this.setState({loading: false})
    })
  }

  onChange = (e) => this.setState({[e.target.id]: e.target.value})

  _validForm = () =>
    this.state.name.trim().length !== 0 &&
    this.state.quantity.trim().length !== 0 &&
    !isNaN(this.state.quantity)

  _disabled = () => this.state.loading || !this._validForm()

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input id="name" className="form-control" onChange={this.onChange} value={this.state.name} required/>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Cantidad</label>
            <input id="quantity" className="form-control" onChange={this.onChange} value={this.state.quantity} required/>
          </div>
          <button className="btn btn-primary btn-block" disabled={this._disabled()}><i className="far fa-plus"></i></button>
        </form>
      </div>
    )
  }
}
