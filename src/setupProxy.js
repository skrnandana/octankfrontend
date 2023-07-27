
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/octank', 
    createProxyMiddleware({
      target : process.env.REACT_APP_ENDPOINT,
      // target : 'https://cma6c097gl.execute-api.us-east-1.amazonaws.com/Stage/octank/',
      changeOrigin: true,
    })
  );
};
