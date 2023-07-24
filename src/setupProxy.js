
//https://mko6b9drb2.execute-api.us-east-1.amazonaws.com/test/stabled

const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
  target: 'https://ibnj3ug6q9.execute-api.us-east-1.amazonaws.com',
  changeOrigin: true,
};
module.exports = function (app) {
  app.use('/Stage/octank', createProxyMiddleware(proxy));
};