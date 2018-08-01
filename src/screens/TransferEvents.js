import React, {Component} from 'react'
import mprestoContract from '../contracts/MPrestoContract'
import {Event} from '../components'

export default class TransferEvents extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    mprestoContract.getTransferEvents().then(this._setEvents).catch(this.props.onError)
  }

  _setEvents = events => this.setState({events})

  render() {
    if (this.state.events.length === 0) return <h3 className="text-center">No existen prestamos...</h3>
    console.log(this.state.events)
    return (
      <div className="p-2">
        <ul className="list-group list-group-flush">
          {this.state.events.map((event, i) => (
            <Event event={event} key={i}/>
          ))}
        </ul>
      </div>
    )
  }
}
