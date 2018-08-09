import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {DASHBOARD, TRANSFER_EVENTS, ALERTS} from '../utils/Routes'
import mprestoContract from '../contracts/MPrestoContract'
import {hexToUtf8} from '../lib/Eth'
import {fetchAlerts} from '../actions'
//import session from '../lib/Session'

class Header extends Component {
/*  navigate = (to) => {
    window.$('#navbarNav').collapse('hide');
    if (to !== this.props.history.location.pathname) {
      this.props.history.push(to)
    }
  }*/

  state = {
    current: '',
    rename: false,
    loading: false
  }

  componentDidMount() {
    this._fetchNickname()
    this.props.fetchAlerts()
  }

  assign = (nickname) => {
    this.setState({loading: true})
    mprestoContract.setNickname(nickname).then(result => {
      this.setState({loading: false, nickname: ''})
      this._fetchNickname()
    }).catch(e => {
      this.setState({loading: false})
      this.props.onError(e)
    })
  }

  _fetchNickname = () => mprestoContract.getNickname(this.props.account).then(this._setNickname).catch(this.props.onError)

  _setNickname = hex => this.setState({current: hexToUtf8(hex).trim()})

  render() {
    //let path = this.props.history.location.pathname
    return (
      <nav className="navbar fixed-top navbar-expand-sm navbar-dark cs-primary-bg-color shadow-sm">
        <Link className="navbar-brand" to={DASHBOARD}>M-Presto</Link>
        <button id="toggler" className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to={DASHBOARD}>Items</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={TRANSFER_EVENTS}>Prestados</Link>
            </li>
          </ul>
          <div className="ml-auto d-flex align-items-center">
            <ul className="navbar-nav mr-2">
              <li className="nav-item active">
                <Link className="nav-link d-flex" to={ALERTS}>
                  <div className="nav-alerts-icon">
                    <small className="badge badge-pill badge-warning">{this.props.alerts.length}</small>
                    <i className="fas fa-bell fa-lg mr-2"></i>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                {this.state.current.length === 0 || this.state.rename ?
                  <NicknameForm current={this.state.current}
                    onSubmit={this.assign}
                    back={() => this.setState({rename: false})}
                    loading={this.state.loading}/>
                :
                  <Nickname nickname={this.state.current} onClick={() => this.setState({rename: true})}/>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const Nickname = ({nickname, onClick}) => (
  <button className="btn btn-outline-light" type="button" onClick={onClick}>
    Hola! <strong>{nickname}</strong>
  </button>
)

class NicknameForm extends Component {
  state = {
    nickname: ''
  }

  _onSubmit = (e) => {
    e.preventDefault()
    let nickname = this.state.nickname.trim()
    if (nickname.length > 30) {
      nickname = nickname.substring(0, 30)
    }
    this.props.onSubmit(nickname)
  }

  _disabled = () =>
    this.state.nickname.trim().length === 0 ||
    this.state.nickname.trim().length > 30

  render() {
    let current = this.props.current
    return (
      <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
        <div className="input-group mr-sm-2">
          <div className="input-group-prepend">
            <button className="btn btn-secondary" type="button" onClick={this.props.back}>
              <i className="fal fa-arrow-alt-left" disabled={current.length === 0}></i>
            </button>
          </div>
          <input maxLength="30" className="form-control"
            placeholder={current.length === 0 ?  "Máximo 30 caracteres" : current}
            value={this.state.nickname}
            onChange={e => this.setState({nickname: e.target.value})}/>
        </div>
        <button className="btn btn-warning my-2 my-sm-0"
          type="submit" disabled={this._disabled() || this.props.loading}>Asignar</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  alerts: state.alerts
})

const mapDispatchToProps = dispatch => ({
  fetchAlerts: () => dispatch(fetchAlerts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
