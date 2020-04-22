const initialState = {
    isOpen: false,
    isSaving: false,
    notificationsType: '',
    error: null,
};

export const setSettingsVisibility = (state, { payload }) => {
    return ({
        ...state,
        isOpen: payload,
    });
};

export const setNotificationsType = (state, { payload }) => {
    return ({
        ...state,
        isSaving: true,
    });
};

export const setNotificationsTypeSuccess = (state, { payload }) => {
    return ({
        ...state,
        isSaving: false,
        notificationsType: payload.type
    });
};

export const setNotificationsTypeFailure = (state, { payload }) => {
    return ({
        ...state,
        isSaving: false,
        error: payload.error
    });
};


export default initialState;
