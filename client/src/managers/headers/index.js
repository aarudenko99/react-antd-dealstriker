const makeHeadersManager = ({
  authManager,
}) => ({
  getHeaders: () => {
    const headers = {
      authorization: undefined,
      'Content-Type': 'application/json; charset=UTF-8',
    };

    const credentials = authManager.getCredentials();
    if (credentials) {
      headers.authorization = `Token ${credentials}`;
    }
    return headers;
  },
});

export default makeHeadersManager;
