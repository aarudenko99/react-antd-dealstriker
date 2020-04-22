import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
    LOG_IN: undefined,
    LOG_IN_SUCCESS: undefined,
    LOG_IN_FAILURE: undefined,
    LOG_OUT: undefined,

    SIGN_UP: undefined,
    SIGN_UP_SUCCESS: undefined,
    SIGN_UP_FAILURE: undefined,

    CHANGE_PASSWORD: undefined,
    CHANGE_PASSWORD_SUCCESS: undefined,
    CHANGE_PASSWORD_FAILURE: undefined,

    RESET_PASSWORD_REQUEST: undefined,

    RESET_PASSWORD: undefined,
    RESET_PASSWORD_SUCCESS: undefined,
    RESET_PASSWORD_FAILURE: undefined,

    //jwt
    GET_JWT_DECODED: undefined,
    SET_JWT_DECODED: undefined,
    CLEAR_JWT: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.logIn, handlers.logIn],
    [actions.logInSuccess, handlers.logInSuccess],
    [actions.logInFailure, handlers.logInFailure],
    [actions.logOut, handlers.logOut],
    [actions.signUp, handlers.signUp],
    [actions.signUpSuccess, handlers.signUpSuccess],
    [actions.signUpFailure, handlers.signUpFailure],

    [actions.changePassword, handlers.changePassword],
    [actions.changePasswordSuccess, handlers.changePasswordSuccess],
    [actions.changePasswordFailure, handlers.changePasswordFailure],

    [actions.resetPasswordRequest, handlers.resetPasswordRequest],

    [actions.resetPassword, handlers.resetPassword],
    [actions.resetPasswordSuccess, handlers.resetPasswordSuccess],
    [actions.resetPasswordFailure, handlers.resetPasswordFailure],

    //jwt
    [actions.getJwtDecoded, handlers.getJwtDecoded],
    [actions.setJwtDecoded, handlers.setJwtDecoded],
    [actions.clearJwt, handlers.clearJwt],

  ]),
  initialState,
);

export default reducer;
