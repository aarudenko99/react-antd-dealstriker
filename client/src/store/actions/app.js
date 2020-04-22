import jwtDecode from 'jwt-decode';

export const ActionTypes = {
    SET_JWT_DECODED: 'APP/SET_JWT_DECODED',
    GET_CURRENT_USER: 'APP/GET_CURRENT_USER',
    GET_CURRENT_USER_SUCCESS: 'APP/GET_CURRENT_USER_SUCCESS',
    GET_CURRENT_USER_FAILURE: 'APP/GET_CURRENT_USER_FAILURE',
};

export const clearJWT = () => (
    dispatch,
    getState,
    { authManager },
) => {
    authManager.removeCredentials();
    dispatch({
        type: ActionTypes.SET_JWT_DECODED,
        decodedJWT: undefined,
    });
};

export const setJWTDecoded = (jwt) => (
    dispatch,
    getState,
    {
        history,
        authManager
    },
) => {
    try {
        if (!jwt) {
            dispatch(clearJWT());
            return;
        }
        authManager.setCredentials(jwt);
        dispatch({
            type: ActionTypes.SET_JWT_DECODED,
            decodedJWT: jwtDecode(jwt),
        });
    } catch (e) {
        dispatch(clearJWT());
    }
};

//
export const getCurrentUser = () => async (
    dispatch,
    getState,
    { api },
) => {
    try {
        dispatch({ type: ActionTypes.GET_CURRENT_USER });
        const response = await api.users.getCurrent();
        dispatch({
            type: ActionTypes.GET_CURRENT_USER_SUCCESS,
            user: response.data,
        });
    } catch (error) {
        dispatch({ type: ActionTypes.GET_CURRENT_USER_FAILURE, error });
    }
};
