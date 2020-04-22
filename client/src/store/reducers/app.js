import createReducer from './utils';
import { ActionTypes } from '../actions/app';

export const initialState = {
    decodedJWT: undefined,
    user: undefined,
};

export default createReducer(
    {
        [ActionTypes.SET_JWT_DECODED]: (state, action) => ({
            ...state,
            decodedJWT: action.decodedJWT,
        }),
        [ActionTypes.GET_CURRENT_USER_FAILURE]: (state, action) => ({
            ...state,
            error: action.error,
        }),
        [ActionTypes.GET_CURRENT_USER_SUCCESS]: (state, action) => ({
            ...state,
            user: action.user,
        }),
        [ActionTypes.LOG_OUT]: () => ({
            ...initialState,
            isLoading: false,
        }),
    },
    initialState,
);
