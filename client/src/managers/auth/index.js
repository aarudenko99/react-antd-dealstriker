const makeAuthManager = ({ storage }) => ({
  getCredentials: () => storage.getItem('token'),
  setCredentials: (token) => storage.setItem('token', token),
  removeCredentials: () => storage.removeItem('token'),
});

export default makeAuthManager;
