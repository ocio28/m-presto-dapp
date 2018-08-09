export default (initialState, handlers, postState) => (state = initialState, action) => {
  let newState = handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
  if (postState.hasOwnProperty(action.type)) {
    postState[action.type](newState)
  }
  return newState
}
