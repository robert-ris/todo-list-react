const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/tasks'],
    createProxyMiddleware({
      target: 'http://localhost:3300',
    })
  );
};
