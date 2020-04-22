import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loginForm from '../auth';
import bids from '../bids';
import chat from '../chat';
import requestForm from '../requestForm';
import settings from '../settings';
import user from '../user';

export default history => {
  return combineReducers({
    router: connectRouter(history),
    loginForm,
    bids,
    chat,
    requestForm,
    settings,
    user,
  });
};
