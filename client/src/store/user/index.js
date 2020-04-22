import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
    GET_USER_DATA: undefined,
    GET_USER_DATA_SUCCESS: undefined,
    GET_USER_DATA_FAILURE: undefined,
    ADD_UNREAD: undefined,
    REMOVE_UNREAD: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getUserData, handlers.getUserData],
    [actions.getUserDataSuccess, handlers.getUserDataSuccess],
    [actions.getUserDataFailure, handlers.getUserDataFailure],
    [actions.addUnread, handlers.addUnread],
    [actions.removeUnread, handlers.removeUnread],
  ]),
  initialState,
);

export default reducer;
