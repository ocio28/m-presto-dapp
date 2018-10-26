import React, {Component} from 'react'
import mprestoContract from '../contracts/MPrestoContract'
import {ITEM} from '../utils/Routes'

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

  itemDetail = () => {
    this.props.navigate(ITEM.replace(':id', this.props.item))
  }

  render() {
    return (
      <li className="list-group-item pr-0 pl-0 cs-pointer" onClick={this.itemDetail} disabled={this.state.loading}>
        <div className="list-group-item-action">
          <div className="d-flex justify-content-between">
            <h4 className="mb-1">{this.state.name}</h4>
            <small className="text-muted">{this.props.item}</small>
          </div>
          <p className="mb-1">Cantidad: {this.state.quantity}</p>
        </div>
      </li>
    )
  }
}
