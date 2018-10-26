import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {DASHBOARD, TRANSFER_EVENTS, ALERTS, PROFILE} from '../utils/Routes'
import {fetchAlerts, fetchNickname} from '../actions'

class Header extends Component {
  state = {
    loading: true
  }

  navigate = (to) => {
    window.$('#navbarNav').collapse('hide');
    if (to !== this.props.history.location.pathname) {
      this.props.history.push(to)
    } else {
      window.location.reload()
    }
  }

  componentDidMount() {
    this.props.fetchNickname(this.props.account).then(() => this.setState({loading: false})).catch(this.props.onError)
    this.props.fetchAlerts()
  }

  render() {
    let path = this.props.history.location.pathname
    return (
      <nav className="navbar fixed-top navbar-expand-sm navbar-dark cs-primary-bg-color shadow-sm">
        <Link className="navbar-brand" to={DASHBOARD}>M-Presto</Link>
        <button id="toggler" className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <MenuItem to={DASHBOARD} label="Colección" path={path} navigate={this.navigate}/>
            <MenuItem to={TRANSFER_EVENTS} label="Prestados" path={path} navigate={this.navigate}/>
          </ul>
          <div className="ml-auto d-flex align-items-center">
            <ul className="navbar-nav mr-2">
              <li className="nav-item">
                {this.state.loading ? null : <Nickname nickname={this.props.nickname} navigate={this.navigate}/>}
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

const MenuItem = ({to, label, path, navigate}) => (
  <li className={"nav-item" + (path === to ? " active" : "")}>
    <div className="nav-link cs-pointer" onClick={() => navigate(to)}>{label}</div>
  </li>
)

const Nickname = ({nickname, navigate}) => (
  <button className="btn btn-outline-light" type="button" onClick={() => navigate(PROFILE)}>
    {nickname.length === 0 ? 'Ingresa tu nombre' : <strong>{nickname}</strong>}
  </button>
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
