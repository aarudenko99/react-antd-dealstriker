import { actions as types } from './index';
import {call, put, takeEvery} from 'redux-saga/effects'
import makeApi from "../../api";
import makeAuthManager from "../../managers/auth";
import makeHeadersManager from "../../managers/headers";

function* setSettingsVisibilitySaga ({payload}) {
}

function* setNotificationsTypeSaga ({payload}) {
    try {
        const authManager = makeAuthManager({ storage: localStorage });
        const headersManager = makeHeadersManager({ authManager });
        const auth = makeApi({headersManager}).auth;
        const { email, type } = payload;

        const response = yield call([auth, auth.setNotificationsType], { email, type });

        if (response.data && !response.data.error) {
            yield put(types.setNotificationsTypeSuccess({ type }));

        }
        else throw 'No response data'

    } catch (error) {
        yield put(types.setNotificationsTypeFailure({ error }));
    }
}

const settingsSagas = [
    takeEvery(types.setSettingsVisibility, setSettingsVisibilitySaga),
    takeEvery(types.setNotificationsType, setNotificationsTypeSaga),
];

export default settingsSagas;
