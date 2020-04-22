const createHandlers = (
  handlers,
  defaultState,
  state,
  action,
) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state || defaultState;
};

const createReducer = (handlers, defaultState = {}) => (
  state,
  action,
) => createHandlers(handlers, defaultState, state, action);

export default createReducer;
