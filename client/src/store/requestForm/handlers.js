const initialState = {
    isLoading: true,
    error: null,
    manufacturers: null,
    vehicles: null
};

export const getManufacturers = () => ({
    ...initialState
});

export const getManufacturersSuccess = (state, { payload }) => ({
    ...state,
    isLoading: false,
    manufacturers: payload.manufacturers
});

export const getManufacturersFailure = (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.error
});

export const getVehicles = (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
    vehicles: null
});

export const getVehiclesSuccess = (state, { payload }) => ({
    ...state,
    isLoading: false,
    vehicles: payload.vehicles
});

export const getVehiclesFailure = (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.error
});

export const getRequests = (state, { payload }) => ({
    ...state,
    requests: payload.requests
});


export default initialState;
