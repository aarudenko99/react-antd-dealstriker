import { actions as types } from './index';
import { all, put, call, take, takeEvery } from 'redux-saga/effects'
import makeApi from '../../api'
//import history from './history'
//import * as httpAuth from 'http/auth';
import { history } from './../../history';
import {message} from "antd";
import jwtDecode from 'jwt-decode';
import makeAuthManager from '../../managers/auth';
import makeHeadersManager from "../../managers/headers";

//////////// authorization
function* logInSaga({ payload }) {
    try {
        const auth = makeApi().auth;
        const { email, password, socialName, socialResp } = payload;
        let response;
        if (!socialName) response = yield call([auth, auth.logIn], { email, password });
        else {
            if (socialName === 'google') response = yield call([auth, auth.google], { profile: socialResp.profileObj, access_token: socialResp.accessToken });
            else if (socialName === 'facebook') response = yield call([auth, auth.facebook], { profile: socialResp, access_token: socialResp.accessToken });
        }

        if (response.data) {
            const { token } = response.data.user;
            const user = { ...response.data.user };

            localStorage.setItem('token', token);
            yield put(types.logInSuccess({ decodedJWT: user }));

        }
        else throw 'No response data'

    } catch (error) {
        yield put(types.logInFailure({ error }));
    }
}

function* logInSuccessSaga({ payload }) {
    try {
        history.push('/dash')
    } catch (error) {
        console.log('error', error)
    }
}

function* signUpSaga({ payload }) {
    try {
        let response;
        const auth = makeApi().auth;
        const { email, password, role, name, zip, manufacturers } = payload;

        if (role === 'customer') {
            response = yield call([auth, auth.registerCustomer], { email, password, role, zip });
        }
        else {
            response = yield call([auth, auth.registerDealer], { email, password, role, name, zip, manufacturers });
        }


        if (response.data) {
            const { token } = response.data.user;
            const user = { ...response.data.user };

            localStorage.setItem('token', token);

            yield put(types.signUpSuccess({ decodedJWT: user }));

            history.push('/dash');
        }

    } catch (error) {
        yield put(types.signUpFailure({ error }))
    }
}

function* logOutSaga({ payload }) {
    localStorage.clear();

    if (history.location.pathname !== '/login') {
        yield put(types.clearJwt());

        history.push('/login');
    }
}

function* changePasswordSaga({ payload }) {
    try {
        const authManager = makeAuthManager({ storage: localStorage });
        const headersManager = makeHeadersManager({ authManager });
        const auth = makeApi({headersManager}).auth;
        const { email, oldPassword, newPassword } = payload;
        const response = yield call([auth, auth.changePassword], { email, oldPassword, newPassword });

        if (response.data) {
            if (!response.data.error) yield put(types.changePasswordSuccess());
            else yield put(types.changePasswordFailure({ error: response.data.error }));
        }
        else throw 'No response data'

    } catch (error) {
        yield put(types.changePasswordFailure({ error }));
    }
}

function* resetPasswordRequestSaga({ payload }) {
    let response;
    const auth = makeApi().auth;
    const { email } = payload;

    response = yield call([auth, auth.resetPasswordRequest], {email});
}

function* resetPasswordSaga({ payload }) {
    let response;
    const auth = makeApi().auth;
    const { id, token, newPassword } = payload;

    response = yield call([auth, auth.resetPassword], { id, token, newPassword });
    if (response) {
        if (response.data && !response.data.errors && response.data.code === 200) {
            yield put(types.resetPasswordSuccess());
            message.success('Password changed. Log in');
            history.push('/login');
        }
        else {
            yield put(types.resetPasswordFailure({ error: response.code }));
            message.error('Wrong link or password', 10);
        }
    }
    else throw 'No response data'
}

////////// jwt actions
export const setJwtDecodedSaga = function* ({ payload }) {
    const { decodedJWT: nonDecodedJWT } = payload;

    try {
        if (!nonDecodedJWT) {
            yield call(types.clearJwt());
            return;
        }

        const decodedJWT = jwtDecode(nonDecodedJWT);
        //makeAuthManager.setCredentials(decodedJWT)

        yield put(types.setJwtDecoded({ decodedJWT }))

    } catch (e) {
        yield put(types.clearJwt());
    }
};

const authSagas = [
    takeEvery(types.logIn, logInSaga),
    takeEvery(types.logInSuccess, logInSuccessSaga),
    takeEvery(types.signUp, signUpSaga),
    takeEvery(types.changePassword, changePasswordSaga),
    takeEvery(types.resetPasswordRequest, resetPasswordRequestSaga),
    takeEvery(types.resetPassword, resetPasswordSaga),

    //jwt
    takeEvery(types.getJwtDecoded, setJwtDecodedSaga),
    takeEvery(types.logOut, logOutSaga)
];

export default authSagas
