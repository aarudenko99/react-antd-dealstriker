import makeAuthApi from './authApi';
import makeFuelApi from './fuelApi';

export const API_URL = process.env.NODE_ENV === 'production' ?
    'https://www.dealstryker.com' :
    'http://localhost:5000';

export const makeApi = (dependencies = {}) => ({
  auth: makeAuthApi(dependencies),
  fuel: makeFuelApi(dependencies),
});

export default makeApi;
