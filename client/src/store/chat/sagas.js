import { actions as types } from './index';
import { history } from './../../history';
import {all, put, call, take, takeEvery} from 'redux-saga/effects'

function* setRecipientSaga ({payload}) {
    history.push('/dash/chat');
}

const chatSagas = [
    takeEvery(types.setRecipient, setRecipientSaga),
];

export default chatSagas
