const initialState = {
    bids: [],
    loading: true,
};

export const setBids = (state, {payload}) => {
    return ({
        ...state,
        bids: payload,
        loading: false,
    });
};

export default initialState;
