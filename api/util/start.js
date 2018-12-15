module.exports = (env, server) => {
  const options = {
    endpoint: '/api',
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    },
  };

  server.start(options);
};
