import React, { Component } from 'react';
import { connect } from 'react-redux'
import {removeAlert} from '../actions'

class Alerts extends Component {
  render() {
    return (
      <div className="p-2">
        <AlertList alerts={this.props.alerts} />
      </div>
    );
  }
}

const AlertList = ({alerts, onRemove}) => {
  if (alerts.length === 0) return <Empty />
  return (
    <ul className="list-group list-group-flush">
      {alerts.map((alert, i) =>
        <Alert key={i} alert={alert} onRemove={() => onRemove(i)}/>)}
    </ul>
  )
}

const Alert = ({alert, onRemove}) => (
  <li className="list-group-item pr-0 pl-0">
    <div className={"d-flex justify-content-between align-items-center alert " + (alert.type === 'success' ? 'alert-success' : 'alert-error')} role="alert">
      {alert.message}
      <div>
        <button type="button" className="close" aria-label="Close" onClick={onRemove}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </li>
)

const Empty = () => (
  <h3 className="text-center">
    No existen alertas...
  </h3>
)

const mapStateToProps = (state) => ({
  alerts: state.alerts
})

const mapDispatchToProps = dispatch => ({
  removeAlert: index => dispatch(removeAlert(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
