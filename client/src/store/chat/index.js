import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
    SET_RECIPIENT: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.setRecipient, handlers.setRecipient],
  ]),
  initialState,
);

export default reducer;
