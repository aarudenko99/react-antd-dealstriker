import { API_URL } from '../index';
import axios from 'axios';

const http = axios.create();

const makeAuthApi = ({ client, headersManager }) => ({
    logIn: data =>
        http.post(`${API_URL}/api/users/login`, { user: { ...data } }),
    registerCustomer: data =>
        http.post(`${API_URL}/api/users/registerCustomer`, { user: { ...data }}),
    registerDealer: data =>
        http.post(`${API_URL}/api/users/registerDealer`, { user: { ...data }}),
    changePassword: data =>
        http.post(`${API_URL}/api/users/changePassword`, { ...data }, {
            headers: headersManager.getHeaders(),
        }),
    resetPasswordRequest: data =>
        http.post(`${API_URL}/api/users/resetPasswordReq`, { ...data }),
    resetPassword: data =>
        http.post(`${API_URL}/api/users/resetPassword`, { ...data }),
    google: data =>
        http.post(`${API_URL}/api/users/oauth/google`, { ...data }),
    facebook: data =>
        http.post(`${API_URL}/api/users/oauth/facebook`, { ...data }),
    getUserData: data =>
        http.post(`${API_URL}/api/users/getUserData`, { ...data }, {
            headers: headersManager.getHeaders(),
        }),
    setNotificationsType: data =>
        http.post(`${API_URL}/api/users/setNotificationsType`, { ...data }, {
            headers: headersManager.getHeaders(),
        }),
});

export default makeAuthApi;
