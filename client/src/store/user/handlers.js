const initialState = {
    isLoading: false,
    userData: {},
    unreadLiveBids: [],
    error: null,
};

export const getUserData = (state, { payload }) => {
    return ({
        ...state,
        isLoading: true,
    });
};

export const getUserDataSuccess = (state, { payload }) => {
    return ({
        ...state,
        isLoading: false,
        userData: payload.userData,
        unreadLiveBids: payload.unreadLiveBids
    });
};

export const getUserDataFailure = (state, { payload }) => {
    return ({
        ...state,
        isLoading: false,
        error: payload.error
    });
};

export const addUnread = (state, { payload }) => {
    return ({
        ...state,
        unreadLiveBids: [...state.unreadLiveBids, payload.id]
    });
};

export const removeUnread = (state, { payload }) => {
    return ({
        ...state,
        unreadLiveBids: state.unreadLiveBids.filter((id) => id !== payload.id)
    });
};

export default initialState;
