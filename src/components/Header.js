import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {DASHBOARD, TRANSFER_EVENTS, ALERTS, PROFILE} from '../utils/Routes'
import mprestoContract from '../contracts/MPrestoContract'
import {hexToUtf8} from '../lib/Eth'
import {fetchAlerts, fetchNickname} from '../actions'
//import session from '../lib/Session'

class Header extends Component {
/*  navigate = (to) => {
    window.$('#navbarNav').collapse('hide');
    if (to !== this.props.history.location.pathname) {
      this.props.history.push(to)
    }
  }*/

  state = {
    loading: true
  }

  componentDidMount() {
    this.props.fetchNickname(this.props.account).then(() => this.setState({loading: false})).catch(this.props.onError)
    this.props.fetchAlerts()
  }

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
              <Link className="nav-link" to={DASHBOARD}>Colección</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={TRANSFER_EVENTS}>Prestados</Link>
            </li>
          </ul>
          <div className="ml-auto d-flex align-items-center">
            <ul className="navbar-nav mr-2">
              <li className="nav-item">
                {this.state.loading ? null : <Nickname nickname={this.props.nickname} />}
              </li>
              <li className="nav-item active">
                <Link className="nav-link d-flex" to={ALERTS}>
                  <div className="nav-alerts-icon">
                    <small className="badge badge-pill badge-warning">{this.props.alerts.length}</small>
                    <i className="fas fa-bell fa-lg mr-2"></i>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const Nickname = ({nickname, onClick}) => (
  <Link className="btn btn-outline-light" to={PROFILE} onClick={onClick}>
    {nickname.length === 0 ? 'Ingresa tu nombre' : <strong>{nickname}</strong>}
  </Link>
)

const mapStateToProps = (state) => ({
  alerts: state.alerts,
  nickname: state.profile.nickname
})

const mapDispatchToProps = dispatch => ({
  fetchAlerts: () => dispatch(fetchAlerts()),
  fetchNickname: (account) => fetchNickname(account).then(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
