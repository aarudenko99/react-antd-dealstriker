import { setJWTDecoded, clearJWT, getCurrentUser } from './app';

export const ActionTypes = {
    LOG_IN: 'AUTH/LOG_IN',
    LOG_IN_SUCCESS: 'AUTH/LOG_IN_SUCCESS',
    LOG_IN_FAILURE: 'AUTH/LOG_IN_FAILURE',
    SIGN_UP: 'AUTH/SIGN_UP',
    SIGN_UP_SUCCESS: 'AUTH/SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'AUTH/SIGN_UP_FAILURE',
    LOG_OUT: 'AUTH/LOG_OUT',
};

// export const logIn = (email, password) => async (
//     dispatch,
//     getState,
//     { api, history },
// ) => {
//     try {
//         dispatch({ type: ActionTypes.LOG_IN });
//         const response = await api.auth.logIn({
//             email,
//             password,
//         });
//         dispatch(setJWTDecoded(response.data.user.token));
//         dispatch({ type: ActionTypes.LOG_IN_SUCCESS });
//         //await dispatch(getCurrentUser());
//         history.push('/dash');
//     } catch (error) {
//         dispatch({
//             type: ActionTypes.LOG_IN_FAILURE,
//             error: error,
//         });
//     }
// };

export const signUp = (email, password, role = 'customer') => async (
    dispatch,
    getState,
    { api, history },
) => {
    try {
        dispatch({ type: ActionTypes.SIGN_UP });
        const response = role === 'customer' ?
            await api.auth.registerCustomer({ email, password }) :
            await api.auth.registerDealer({ email, password });
        dispatch({ type: ActionTypes.SIGN_UP_SUCCESS });
        dispatch(setJWTDecoded(response.data.user.token));
        history.push('/dash');
    } catch (error) {
        dispatch({
            type: ActionTypes.SIGN_UP_FAILURE,
            error: error,
        });
    }
};

export const logOut = () => async (
    dispatch,
    getState,
    { history },
) => {
    if (history.location.pathname !== '/login') {
        dispatch({ type: ActionTypes.LOG_OUT });
        dispatch(clearJWT());
        history.push('/login');
    }
};
