import { handleActions, createActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
    GET_MANUFACTURERS: undefined,
    GET_MANUFACTURERS_SUCCESS: undefined,
    GET_MANUFACTURERS_FAILURE: undefined,

    GET_VEHICLES: undefined,
    GET_VEHICLES_SUCCESS: undefined,
    GET_VEHICLES_FAILURE: undefined,

    GET_REQUESTS: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getManufacturers, handlers.getManufacturers],
    [actions.getManufacturersSuccess, handlers.getManufacturersSuccess],
    [actions.getManufacturersFailure, handlers.getManufacturersFailure],

    [actions.getVehicles, handlers.getVehicles],
    [actions.getVehiclesSuccess, handlers.getVehiclesSuccess],
    [actions.getVehiclesFailure, handlers.getVehiclesFailure],

    [actions.getRequests, handlers.getRequests],
  ]),
  initialState
);

export default reducer;



