/*export function createReducer(initialState, handlers) {
  return (state = initialState, action) => (
    handlers.hasOwnProperty(action.type) ? andlers[action.type](state, action) : state
  )
}*/

export default (initialState, handlers) => (state = initialState, action) =>
  handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
