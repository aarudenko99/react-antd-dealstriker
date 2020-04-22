import { actions as types } from './index';
import { history } from './../../history';
import {takeEvery} from 'redux-saga/effects'

function* setBidsSaga ({payload}) {
}

const bidsSagas = [
    takeEvery(types.setBids, setBidsSaga),
];

export default bidsSagas
