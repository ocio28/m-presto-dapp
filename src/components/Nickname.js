import React, {Component} from 'react'
import mprestoContract from '../contracts/MPrestoContract'
import {hexToUtf8} from '../lib/Eth'

//const $ = window.$

export default class Nickname extends Component {
  state = {
    current: '',
    nickname: '',
    loading: false
  }

  componentDidMount() {
    this._fetchNickname()
  }

  assign = (e) => {
    e.preventDefault()
    this.setState({loading: true})
    mprestoContract.setNickname(this.state.nickname.trim()).then(result => {
      console.log(result)
      this.setState({loading: false, nickname: ''})
      this._fetchNickname()
    }).catch(e => {
      this.setState({loading: false})
      this.props.onError(e)
    })
  }

  _fetchNickname = () => mprestoContract.getNickname(this.props.account).then(this._setNickname).catch(this.props.onError)

  _setNickname = hex => this.setState({current: hexToUtf8(hex).trim()})

  _disabled = () => this.state.loading ||
    this.state.nickname.trim().length === 0 ||
    this.state.nickname.trim().length > 33

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>Nickname: <strong>{this.state.current}</strong></div>
            <form className="form-inline" onSubmit={this.assign}>
              <label htmlFor="nickname" className="sr-only">Nickname</label>
              <input maxLength="33" className="form-control mr-2" placeholder="nickname" value={this.state.nickname} onChange={e => this.setState({nickname: e.target.value})}/>
              <button className="btn btn-warning" disabled={this._disabled()}>Asignar</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
