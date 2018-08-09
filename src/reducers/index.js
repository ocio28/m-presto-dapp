import { combineReducers } from 'redux'
import createReducer from './createReducer'
import * as types from '../actions/Types'
import {stateToLocal} from '../actions'

const alerts = createReducer([], {
  [types.SET_ALERTS]: (state, action) => action.alerts,
  [types.PUSH_ALERT]: (state, action) => [...state, action.alert],
  [types.REMOVE_ALERT]: (state, action) => {
    let alerts = [...state]
    alerts.splice(action.index, 1)
    return alerts
  }
}, {
  [types.REMOVE_ALERT]: stateToLocal,
  [types.PUSH_ALERT]: stateToLocal
})

export default combineReducers({alerts})
