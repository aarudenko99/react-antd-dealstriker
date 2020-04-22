import { all } from 'redux-saga/effects'
import authSaga from './auth/sagas';
import bidsSaga from './bids/sagas';
import chatSaga from './chat/sagas';
import requestSaga from './requestForm/sagas';
import settingsSaga from './settings/sagas';
import userSaga from './user/sagas';

export default function* rootSaga() {
    yield all([
        ...authSaga,
        ...bidsSaga,
        ...chatSaga,
        ...requestSaga,
        ...settingsSaga,
        ...userSaga
    ]);
};
