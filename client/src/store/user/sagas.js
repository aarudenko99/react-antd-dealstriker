import { actions as types } from './index';
import {call, put, takeEvery} from 'redux-saga/effects'
import makeApi from "../../api";
import makeAuthManager from "../../managers/auth";
import makeHeadersManager from "../../managers/headers";

function* getUserDataSaga ({payload}) {
    try {
        const authManager = makeAuthManager({ storage: localStorage });
        const headersManager = makeHeadersManager({ authManager });
        const auth = makeApi({headersManager}).auth;
        const { email } = payload;
        const response = yield call([auth, auth.getUserData], { email });

        if (response.data && !response.data.error) {
            yield put(types.getUserDataSuccess({ userData: response.data, unreadLiveBids: response.data.unreadLiveBids }));
        }
        else throw 'No response data';
    } catch (error) {
        yield put(types.getUserDataFailure({ error }));
    }
}

const userSagas = [
    takeEvery(types.getUserData, getUserDataSaga),
];

export default userSagas;
