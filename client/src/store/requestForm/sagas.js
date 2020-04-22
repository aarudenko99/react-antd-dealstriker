import { actions as types } from './index';
import { put, call, all, takeEvery } from 'redux-saga/effects'
import makeApi from '../../api';

function* getManufacturersSaga() {
        try {
            const fuel = makeApi().fuel;
            const response = yield call([fuel, fuel.getManufacturers]);

            if (response.data) {
              yield put(types.getManufacturersSuccess({ manufacturers: response.data }));
              console.log('manufacturers', response.data);
            }
            else throw 'No response data';
        } catch (error) {
            yield put(types.getManufacturersFailure({ error }));
        }
}

function* getVehiclesSaga({ payload: manufacturer }) {
        try {
          const fuel = makeApi().fuel;
          const vehiclesResponse = yield call([fuel, fuel.getVehicles], manufacturer);
          console.log(vehiclesResponse.data)
          if (vehiclesResponse.data) yield put(types.getVehiclesSuccess({
            vehicles: vehiclesResponse.data[manufacturer]
          }));
          else throw 'No response data';
        } catch (error) {
            yield put(types.getVehiclesFailure({ error }));
        }
}

const requestSagas = [
    takeEvery(types.getManufacturers, getManufacturersSaga),
    takeEvery(types.getVehicles, getVehiclesSaga),
];

export default requestSagas;
