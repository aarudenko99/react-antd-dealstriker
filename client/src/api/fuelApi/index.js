import axios from 'axios';

const http = axios.create({
  baseURL: 'https://dealstryker-turbo.herokuapp.com'
});


const makeFuelApi = ({ client, headersManager }) => ({
  getManufacturers: () =>
      http.get(`/manu`),
  getVehicles: (manufacturerId) =>
      http.get(`/models/${manufacturerId}`),
});

export default makeFuelApi;
