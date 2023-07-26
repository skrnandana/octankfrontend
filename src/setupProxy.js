
//https://mko6b9drb2.execute-api.us-east-1.amazonaws.com/test/stabled

// const { createProxyMiddleware } = require('http-proxy-middleware');
// const proxy = {
//   target: 'https://nsqm66tmj4.execute-api.us-east-1.amazonaws.com/Stage/',
//   changeOrigin: true,
// };
// module.exports = function (app) {
//   app.use('/octank', createProxyMiddleware(proxy));
// };

// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/octank', // Specify the API route you are using in your fetch/axios request
    createProxyMiddleware({
      target: 'https://nsqm66tmj4.execute-api.us-east-1.amazonaws.com/Stage/', // Replace with your backend server URL
      changeOrigin: true,
    })
  );
};
