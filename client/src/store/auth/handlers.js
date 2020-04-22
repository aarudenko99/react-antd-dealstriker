const initialState = {
    isLoading: false,
    isSendingPass: false,
    error: null,
    decodedJWT: null,
    resetPassword: false,
};

export const logIn = (state, {payload}) => ({
    ...state,
    isLoading: true,
    error: undefined,
});

export const logInSuccess = (state, { payload }) => ({
    ...state,
    isLoading: false,
    decodedJWT: payload.decodedJWT
});

export const logInFailure = (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.error
});

export const logOut = (state, { payload }) => ({
    ...state,
    isLoading: false,
});

export const changePassword = (state, { payload }) => ({
   ...state,
    isSendingPass: true,
    error: undefined,
});

export const changePasswordSuccess = (state, { payload }) => ({
    ...state,
    isSendingPass: false,
});

export const changePasswordFailure = (state, { payload }) => ({
    ...state,
    isSendingPass: false,
    error: payload.error
});

export const resetPasswordRequest = (state, { payload }) => ({
    ...state,
    isResettingPassword: true,
    error: undefined,
});

export const resetPassword = (state, { payload }) => ({
    ...state,
    isResettingPassword: true,
    error: undefined,
});

export const resetPasswordSuccess = (state, { payload }) => ({
    ...state,
    isResettingPassword: false,
});

export const resetPasswordFailure = (state, { payload }) => ({
    ...state,
    isResettingPassword: false,
    error: payload.error,
});


export const signUp = (state, { payload }) => ({
    ...state,
    isLoading: true,
    error: undefined,
});

export const signUpSuccess = (state, { payload }) => ({
    ...state,
    isLoading: false,
    decodedJWT: payload.decodedJWT
});

export const signUpFailure = (state, { payload }) => ({
    ...state,
    error: payload.error,
    isLoading: false,
});

// jwt
export const setJwtDecoded = (state, {payload}) => ({
    ...state,
    decodedJWT: payload.decodedJWT
});
export const getJwtDecoded = (state, {payload}) => ({
    ...state,
    error: '',
});

export const clearJwt = (state, { payload }) => ({
    ...state,
    decodedJWT: null
});

export default initialState;
