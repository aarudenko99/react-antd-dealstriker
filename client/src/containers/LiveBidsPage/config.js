export const SOCKET_URI = process.env.NODE_ENV === 'production' ?
    (process.env.SOCKET_URI || 'https://www.dealstryker.com') :
    'http://localhost:5000';
