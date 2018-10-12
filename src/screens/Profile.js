import React from 'react'
import Screen from './Screen'
import {connect} from 'react-redux'
import {setNickname, fetchNickname} from '../actions'

class Profile extends Screen {
  state = {
    current: '',
    nickname: '',
    success: false,
    loading: false
  }

  submit = (e) => {
    e.preventDefault()
    let nickname = this.state.nickname.trim()
    if (nickname.length > 30) {
      nickname = nickname.substring(0, 30)
    }
    this.startLoading()
    this.props.setNickname(nickname).then(() =>
      this.props.fetchNickname(this.props.account)
    ).then(this.stopLoading).then(this.success).catch(this.onError)
  }

  success = () => this.setState({nickname: '', success: true})

  _disabled = () =>
    this.state.nickname.trim().length === 0 ||
    this.state.nickname.trim().length > 30 || this.state.loading

  render() {
    return (
      <div className="pt-2">
        <Success visible={this.state.success} onClose={() => this.setState({success:false})}>
          Listo!, ahora seras conocido como <strong>{this.props.nickname}</strong>.
        </Success>
        <h3>Tu nombre actual es "{this.props.nickname}"</h3>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <input id="nickname" maxLength="30" className="form-control"
              placeholder="Escribe tu nuevo nombre" value={this.state.nickname} onChange={this.onChange}
              disabled={this.state.loading}/>
            <small className="text-muted">*Nombre o sobrenombre. Te identifica dentro de la aplicación, máximo 30 letras o números</small>
          </div>
          <button className="btn btn-primary btn-block" disabled={this._disabled()}>
            {this.state.loading ? 'Registrando tu nombre...' : 'Registrar'}
          </button>
        </form>
      </div>
    )
  }
}

const Success = ({children, visible, onClose}) => (
  !visible ? null :
  <div className="alert alert-success">
    {children}
    <button type="button" className="close" aria-label="Close" onClick={onClose}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
)

const mapStateToProps = (state) => ({
  nickname: state.profile.nickname
})

const mapDispatchToProps = (dispatch) => ({
  setNickname: (nickname) => setNickname(nickname).then(dispatch),
  fetchNickname: (account) => fetchNickname(account).then(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
