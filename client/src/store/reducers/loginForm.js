import createReducer from './utils';
import { ActionTypes } from '../actions/auth';

export const initialState = {
    isLoading: false,
    error: undefined,
};

export default createReducer(
    {
        [ActionTypes.LOG_IN]: (state) => ({
            ...state,
            isLoading: true,
            error: undefined,
        }),
        [ActionTypes.LOG_IN_SUCCESS]: (state) => ({ ...state, isLoading: false }),
        [ActionTypes.LOG_IN_FAILURE]: (state, action) => ({
            ...state,
            error: action.error,
            isLoading: false,
        }),
    },
    initialState,
);
