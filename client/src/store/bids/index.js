import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
    SET_BIDS: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.setBids, handlers.setBids],
  ]),
  initialState,
);

export default reducer;
