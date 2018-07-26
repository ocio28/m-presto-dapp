import React, {Component} from 'react'
import mprestoContract from '../contracts/MPrestoContract'

export default class TransferEvents extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    mprestoContract.getTransferEvents().then(this._setEvents).catch(this.props.onError)
  }

  _setEvents = events => this.setState({events})

  render() {
    if (this.state.events.length === 0) return <h3 className="text-light text-center">No existen prestamos...</h3>
    return (
      <div>
        <h3 className="text-light">Prestamos</h3>
        <ul className="list-group">
          {this.state.events.map((event, i) => (
            <Item to={event.to} itemId={event.itemId} key={i}/>
          ))}
        </ul>
      </div>
    )
  }
}

class Item extends Component {
  state = {
    name: '',
    owner: '',
    nickname: ''
  }

  componentDidMount() {
    mprestoContract.getItem(this.props.itemId).then(result => {
      console.log(result)
      this.setState({name: result.name, owner: result.owner, nickname: result.nickname})
    }).catch(console.error)
  }

  render() {
    return (
      <li className="list-group-item">
        {this.props.to} {this.props.itemId}
      </li>
    )
  }
}
