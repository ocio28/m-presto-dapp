import * as types from '../actions/Types'
import {stateToLocal} from '../actions'

const saveState = {
  [types.REMOVE_ALERT]: (state) => stateToLocal(state),
  [types.PUSH_ALERT]: (state) => stateToLocal(state)
}

export default (initialState, handlers) => (state = initialState, action) => {
  let newState = handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
  if (saveState.hasOwnProperty(action.type)) {
    saveState[action.type](newState)
  }
  return newState
}
