import createReducer from './utils';
import { ActionTypes } from '../actions/auth';

export const initialState = {
    isLoading: false,
    error: undefined,
};

export default createReducer(
    {
        [ActionTypes.SIGN_UP]: (state) => ({
            ...state,
            isLoading: true,
            error: undefined,
        }),
        [ActionTypes.SIGN_UP_SUCCESS]: (state) => ({
            ...state,
            isLoading: false,
        }),
        [ActionTypes.SIGN_UP_FAILURE]: (state, action) => ({
            ...state,
            error: action.error,
            isLoading: false,
        }),
    },
    initialState,
);
