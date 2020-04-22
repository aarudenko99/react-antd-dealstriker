import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
    SET_SETTINGS_VISIBILITY: undefined,
    SET_NOTIFICATIONS_TYPE: undefined,
    SET_NOTIFICATIONS_TYPE_SUCCESS: undefined,
    SET_NOTIFICATIONS_TYPE_FAILURE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.setSettingsVisibility, handlers.setSettingsVisibility],
    [actions.setNotificationsType, handlers.setNotificationsType],
    [actions.setNotificationsTypeSuccess, handlers.setNotificationsTypeSuccess],
    [actions.setNotificationsTypeFailure, handlers.setNotificationsTypeFailure],
  ]),
  initialState,
);

export default reducer;
