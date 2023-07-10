
//https://mko6b9drb2.execute-api.us-east-1.amazonaws.com/test/stabled

const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
  target: 'https://vcf87egfsl.execute-api.us-east-1.amazonaws.com/Stage',
  changeOrigin: true,
};
module.exports = function (app) {
  app.use('/octank', createProxyMiddleware(proxy));
};