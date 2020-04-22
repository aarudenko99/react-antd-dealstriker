const initialState = {
    roomId: '',
};

export const setRecipient = (state, {payload}) => {
    return ({
        ...state,
        roomId: payload.offerId,
    });
};

export default initialState;
